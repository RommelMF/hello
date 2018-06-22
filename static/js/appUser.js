Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '../static/extjs/examples/ux');
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.ux.grid.FiltersFeature',
    'Ext.toolbar.Paging',
    'Ext.ux.ajax.JsonSimlet',
    'Ext.ux.ajax.SimManager'
]);


Ext.onReady(function(){
    var filters = {
        ftype: 'filters',
        encode: true,
        local: true
    };
    var origin_grid = Ext.define('Note', {
           extend: 'Ext.data.Model',

            idProperty: 'pk',

            fields: [{
                name: 'pk',
                type: 'int'
            }, {
                name: 'title',
                mapping: 'title',
                type: 'string'
            }, {
                name: 'description',
                mapping: 'description',
                type: 'string'
            }, {
                name: 'date_create',
                mapping: 'date_create',
                type: 'date'
            }, {
                name: 'category name',
                mapping: 'categories__category',
                type: 'string'
              }, {
                name: 'category',
                mapping: 'categories',
                type: 'number'
            }, {
                name: 'user',
                mapping: 'users',
                type: 'number'
            }, {
                name: 'user name',
                mapping: 'users__login',
                type: 'string'
            }, {
               name: 'favorites',
               mapping: 'favorites',
               type: 'boolean'
            }, {
               name: 'uuid',
               mapping: 'uuid',
               type: 'string'
            }, {
                name: 'publish',
                mapping: 'publish',
                type: 'boolean'
            }]
      });

       var store = Ext.create('Ext.data.Store', {
                    model: 'Note',
                    autoLoad: true,
                    proxy: {
                            type: 'ajax',
                            url: 'http://127.0.0.1:8000/get/',
                            reader: {
                                type: 'json',
                                // root: ''
                            }
                }
        });
       debugger
      var grid = Ext.create('Ext.grid.Panel', {
        title: 'Notes',
        height: 700,
        width: 900,
        tools: [
            {
                xtype: 'button',
                text : 'Delete',
                margin:'0 0 0 0',
                enableToggle: true,
                handler: function(event, toolEl, panel){
                    var itemId = grid.getSelectionModel().getSelection()[0].data['pk']

                    Ext.Ajax.request({
                        url: 'http://127.0.0.1:8000/delete/' + itemId,
                        success: function(responce, options){
                                Ext.MessageBox.alert('Note deleted. ',action.result.message);
                                enableToggle = false;
                    },
                    failure: function(responce, options){
                                Ext.MessageBox.alert('Error. ',action.result.message);
                            }

                    })
                }
            }, {
                xtype: 'button',
                text : 'Add',
                margin:'0 0 0 15',
                enableToggle: true,
                handler: function(event, toolEl, panel){

                     var formPanel=Ext.create('Ext.form.Panel',{
                        title: 'Add form',
                        width: 488,
                        height: 278,
                        layout: 'anchor',
                        defaults: {
                            anchor: '80%'
                        },
                        renderTo: Ext.getBody(),
                        items:[{
                                xtype: 'textfield',
                                fieldLabel: 'Title',
                                name: 'title',
                                labelAlign: 'top',
                                cls: 'field-margin',
                                flex: 1
                               }, {
                                xtype: 'textfield',
                                fieldLabel: 'Description',
                                name: 'description',
                                labelAlign: 'top',
                                cls: 'field-margin',
                                flex: 1
                              }, {
                                xtype: 'checkboxfield',
                                fieldLabel: 'Favorites',
                                name: 'favorites',
                                labelAlign: 'top',
                                cls: 'field-margin',
                                flex: 1
                              }, {
                                xtype: 'numberfield',
                                fieldLabel: 'Category id',
                                name: 'category',
                                labelAlign: 'top',
                                cls: 'field-margin',
                                flex: 1
                        }],
                        // buttons form
                        buttons: [{
                            text: 'Save',
                            handler: function() {
                                // send move
                                formPanel.getForm().submit({
                                    url: 'http://127.0.0.1:8000/create/',

                                    success: function(form, action){
                                                window.close()
                                                Ext.MessageBox.alert('Note saved. ',action.result.message);
                                                enableToggle = false;;
                                    },
                                    failure: function(form, action){
                                                Ext.MessageBox.alert('Error. ',action.result.message);
                                            }
                                });
                            }
                        }, {
                            text: 'Cancel',
                            handler: function() {
                                // window closed
                                window.close();
                                enableToggle = false;
                             }
                        }]
                     });

                     var window = Ext.create('widget.window', {
                          title: 'Note',
                          width: 500,
                          height: 310,
                         bodyStyle: 'background-color: #ffffff',
                     });
                    window.show();
                    window.add(formPanel);
                }
            },{
            // button edit
                xtype: 'button',
                text : 'Edit',
                margin:'0 0 0 15',
                enableToggle: true,
                handler: function(event, toolEl, panel){
                     var item_id = grid.getSelectionModel().getSelection()[0].data['pk'];

                     var formPanelEdit=Ext.create('Ext.form.Panel',{
                        title: 'Edit form',
                        width: 488,
                        height: 278,
                        layout: 'anchor',
                        defaults: {
                            anchor: '80%'
                        },
                        renderTo: Ext.getBody(),
                        items:[{
                                xtype: 'textfield',
                                fieldLabel: 'Title',
                                name: 'title',
                                labelAlign: 'top',
                                cls: 'field-margin',
                                flex: 1
                               }, {
                                xtype: 'textfield',
                                fieldLabel: 'Description',
                                name: 'description',
                                labelAlign: 'top',
                                cls: 'field-margin',
                                flex: 1
                              }, {
                                xtype: 'checkboxfield',
                                fieldLabel: 'Publish',
                                name: 'favorites',
                                labelAlign: 'top',
                                cls: 'field-margin',
                                flex: 1
                              }, {
                                xtype: 'numberfield',
                                fieldLabel: 'Category id',
                                name: 'category',
                                labelAlign: 'top',
                                cls: 'field-margin',
                                flex: 1

                        }],
                        // buttons form
                        buttons: [{
                            text: 'Save',
                            handler: function() {
                                // send move
                                formPanelEdit.getForm().submit({
                                    url: 'http://127.0.0.1:8000/edit/' + item_id,


                                    success: function(form, action){
                                                windowEdit.close();
                                                Ext.MessageBox.alert('Note saved. ',action.result.message);
                                                enableToggle = false;
                                    },
                                    failure: function(form, action){
                                                Ext.MessageBox.alert('Error. ',action.result.message);
                                            }
                                });
                            }
                            }, {
                                text: 'Cancel',
                                handler: function() {
                                    // not save
                                    enableToggle = false;
                                    windowEdit.close();

                                }
                         }],
                     });
                     formPanelEdit.getForm().setValues(item.data);

                     var windowEdit = Ext.create('widget.window', {
                          title: 'Note',
                          width: 500,
                          height: 310,
                         bodyStyle: 'background-color: #ffffff'
                     });
                     windowEdit.show();
                     windowEdit.add(formPanelEdit);
                }
            }, {
            // get link
                xtype: 'button',
                text : 'Make publish',
                margin:'0 0 0 15',
                enableToggle: true,
                handler: function(event, toolEl, panel){
                     var item = grid.getSelectionModel().getSelection()[0]
                     var formPanelGetLink=Ext.create('Ext.form.Panel',{
                        title: 'Get link form',
                        width: 488,
                        height: 278,
                        layout: 'anchor',
                        defaults: {
                            anchor: '80%'
                        },
                        renderTo: Ext.getBody(),
                        items:[{
                                xtype: 'textfield',
                                fieldLabel: 'Link',
                                name: 'uuid',
                                labelAlign: 'top',
                                cls: 'field-margin',
                                flex: 1
                               }
                        ],
                        // buttons form
                        buttons: [{
                            text: 'Close',
                            handler: function() {
                                // действие отмены
                                windowGetLink.close()
                                enableToggle = false;
                                }
                        },
                            {
                            text: 'Publish',
                            handler: function() {
                                // note published
                                var item1 = grid.getSelectionModel().getSelection()[0]
                                // var el = formPanelGetLink.getForm().setValues(item1.data);

                                Ext.Ajax.request({
                                    url: 'http://127.0.0.1:8000/publish/' + item1.data['pk'],
                                    success: function(response, options){
                                        windowGetLink.close()
                                                Ext.MessageBox.alert('Note publish.');
                                    },
                                    failure: function(response, options){
                                    }
                                });
                                windowGetLink.close()
                                enableToggle = false;
                                }
                        }],
                     });
                     formPanelGetLink.getForm().setValues(item.data)

                    var windowGetLink = Ext.create('widget.window', {
                         title: 'Note',
                         width: 500,
                         height: 310,
                        bodyStyle: 'background-color: #ffffff'
                    });
                    windowGetLink.show();
                    windowGetLink.add(formPanelGetLink);
                }
            }, {
                // logout
                xtype: 'button',
                text: 'Logout',
                margin: '0 0 0 15',
                enableToggle: true,
                handler: function (event, toolEl, panel) {
                    Ext.Ajax.request({
                        url: 'http://127.0.0.1:8000/logout/',
                        success: function (response, options) {
                            Ext.MessageBox.alert('user is logout.');
                            enableToggle = false;
                            location.href =  'http://127.0.0.1:8000/main/';
                        },
                        failure: function (response, options) {
                            Ext.MessageBox.alert('Error.');
                        }
                    });

                }
         }],
        // data store(grid)
        store: store,
        features: [filters],
        columns: [{
            header: 'Title',
            dataIndex: 'title',
            filter: {
                type: 'string'
            }
        }, {
            header: 'Description',
            dataIndex: 'description',
            filter: {
                type: 'string'
            }

        }, {
            header: 'Date create',
            dataIndex: 'date_create',
            xtype:'datecolumn',
            format: 'Y-m-d',
            flex:1,
            filter: {
                type: 'date'
            }
        }, {
            header: 'Category name',
            dataIndex: 'category name',
            filter: {
                type: 'string'
            }
        }, {
            header: 'Favorites',
            dataIndex: 'favorites',
            filter: {
                type: 'boolean'
            }
        }, {
            header: 'publish',
            dataIndex: 'publish',
            filter: {
                type: 'boolean'
            }
        }],
        renderTo: Ext.getBody()
    });
});