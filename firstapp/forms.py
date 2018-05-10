from django import forms


class UserForm(forms.Form):
    name = forms.CharField(label='User Name', help_text='Enter your name', min_length=4)
    age = forms.IntegerField(label='User Age', initial=18)
    comment = forms.CharField(label='Comments', widget=forms.Textarea, required=False)
    field_order = ['age', 'comment', 'name']

