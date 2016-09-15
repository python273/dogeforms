Dogeforms - Simple Django AJAX forms
================================
[Readme на русском](readme-ru.md)

This jQuery plugin helps you create AJAX forms with Django. Example Django project included.

Features:
* AJAX
* Displaying errors
* Formset support

## Usage
Include jQuery and the plugin on a page

```html
<script src="{% static 'js/jquery.min.js' %}"></script>
<script src="{% static 'js/jquery.dogeforms.js' %}"></script>
```

Create form
```html
<form id="form" action="." method="post">
  {% csrf_token %}

  <div class="form-group">
    <label for="id_message">Message</label>
    {{ form.message }}
  </div>

  <div class="form-group">
    <button id="form-submit">Send</button>
  </div>
</form>
```

Dogeform it
```html
<script>
  $.dogeform({
    formId: 'contact-form',
    submitBtnId: 'contact-form-submit'
  });
</script>
```

Create view
```python
class ContactFormView(View):
    def get(self, request):
        return render(request, 'contact_form.html', {
            'form': ContactForm()
        })

    def post(self, request):
        form = ContactForm(request.POST)

        if form.is_valid():
            send_message(form.cleaned_data['message'])
            return JsonResponse({'ok': True, 'redirect': reverse('success')})

        return JsonResponse({'errors': form.errors})
```

## API
### Dogeform options
* formId
* submitBtnId
* success (function) - this function called if the response contains `ok` key with value `true`
* loadingText (html) - this text displayed in the button until the request is received. You can use it for loading spinner. If you don't want to use it, set it to `false`
* successTooltipText (text) - text of tooltip that shown if response contains `ok` key with value `true` (required bootstrap)

### Redirect
If the response contains `redirect` key then user will be redirected to this link. Example:
```json
{"ok": true, "redirect": "/success/"}
```
