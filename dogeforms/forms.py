from django import forms


class ContactForm(forms.Form):
    email = forms.EmailField()
    message = forms.CharField(max_length=1000, widget=forms.Textarea())

    def clean_message(self):
        message = self.cleaned_data['message']

        if 'doge' not in message:
            raise forms.ValidationError('Message should contain doge')

        return message
