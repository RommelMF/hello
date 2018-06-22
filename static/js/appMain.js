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
                name: 'category',
                mapping: 'categories__category',
                type: 'string'
            }, {
                name: 'user',
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
                            url: 'http://127.0.0.1:8000/getpublish/',
                            reader: {
                                type: 'json',
                                // root: ''
                            }
                }
        });
    var grid = Ext.create('Ext.grid.Panel', {
        title: 'Notes',
        height: 700,
        width: 900,
        tools: [
            {
                xtype: 'button',
                text : 'Registration',
                margin:'0 0 0 0',
                enableToggle: true,
                handler: function(event, toolEl, panel){
                    location.href = 'http://127.0.0.1:8000/registr/'

                }
            }, {
                xtype: 'button',
                text : 'Auth',
                margin:'0 0 0 15',
                enableToggle: true,
                handler: function(event, toolEl, panel){
                    location.href = 'http://127.0.0.1:8000/auth/'

                }
            }, {
                xtype: 'button',
                text : 'Make a favorites',
                margin:'0 0 0 15',
                enableToggle: true,
                handler: function(event, toolEl, panel){
                    var item_id = grid.getSelectionModel().getSelection()[0].data['pk'];

                    Ext.Ajax.request({
                        url: 'http://127.0.0.1:8000/favorites/' + item_id,
                        success: function (response, options) {
                            Ext.MessageBox.alert('Note add in favorites.');
                            enableToggle = false;
                        },
                        failure: function (response, options) {
                            Ext.MessageBox.alert('Error.');
                        }
                    });
                    // url: 'http://127.0.0.1:8000/favorites/' + item_id;
                    // enableToggle = false;

                }
        }],
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
            header: 'Uuid',
            dataIndex: 'uuid',
        }, {
            header: 'Category',
            dataIndex: 'category',
        }, {
            header: 'User',
            dataIndex: 'user',
        }, {
            header: 'favotites',
            dataIndex: 'favorites',
            filter: {
                xtype: 'boolean'
            }
        }],
        renderTo: Ext.getBody()
    });
});