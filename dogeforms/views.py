import time

from django.http import JsonResponse
from django.shortcuts import render
from django.views.generic import View

from .forms import ContactForm


class ContactFormView(View):
    def get(self, request):
        return render(request, 'contact_form.html', {
            'form': ContactForm()
        })

    def post(self, request):
        form = ContactForm(request.POST)

        if form.is_valid():
            time.sleep(2)
            return JsonResponse({'ok': True})

        return JsonResponse({'errors': form.errors})
