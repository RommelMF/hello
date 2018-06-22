Ext.onReady(function(){
    var loginForm=Ext.create('Ext.form.Panel',{
        title: 'Registration',
        width: 300,
        height:150,
        bodyPadding:10,
        layout: 'anchor',
        defaults: {
            anchor: '80%'
        },
        renderTo: Ext.getBody(),
        items: [{
                xtype: 'textfield',
                fieldLabel: 'Login',
                name: 'login'
            }, {
                xtype: 'textfield',
                name: 'password',
                fieldLabel: 'Password',
                inputType: 'password'
            }, {
                xtype: 'textfield',
                name: 'email',
                fieldLabel: 'Email'
         }],
        buttons: [{
            text: 'Send',
            handler: function() {
                loginForm.getForm().submit({
                    url: 'http://127.0.0.1:8000/registr/',
                    success: function(form, action){
                                Ext.MessageBox.alert('You are registr. ',action.result.message);
                    },
                    failure: function(form, action){
                                Ext.MessageBox.alert('Error. ',action.result.message);
                            }
                });
            }
        }]
    });
});