Dogeforms - Simple Django AJAX forms
================================
Этот jQuery плагин помогает вам создавать AJAX формы с Django.

Функции:
* AJAX
* Отображение ошибок
* Поддержка Formset

## Использование
Добавьте jQuery и плагин на страницу

```html
<script src="{% static 'js/jquery.min.js' %}"></script>
<script src="{% static 'js/jquery.dogeforms.js' %}"></script>
```

Создайте форму
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

Задогеформите это
```html
<script>
  $.dogeform({
    formId: 'contact-form',
    submitBtnId: 'contact-form-submit'
  });
</script>
```

Создайте view
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
### Dogeform параметры
* formId - ID формы
* submitBtnId - ID кнопки отправки формы
* success (function) - эта функция вызывается, если ответ содержит `ok` с значением `true`
* loadingText (html) - этот текст показывается, пока не придет ответ. Например можно показывать символ загрузки.
* successTooltipText (text) - этот текст показывается в тултипе, если ответ содержит `ok` с значением `true` (требуется bootstrap)

### Redirect
Если ответ содержит `redirect`, то пользователь будет перенаправлен по этой ссылке. Пример:
```json
{"ok": true, "redirect": "/success/"}
```
