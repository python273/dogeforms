(function ($) {
    $.dogeform = function (options) {
        /*
         formId (id)
         submitBtnId (id)
         success (function)
         loadingText (html)
         successTooltipText (text)
         */

        var opts = $.extend({
            loadingText: "<span class='fa fa-spinner fa-spin'></span>"
        }, $.dogeform.defaults, options);

        var $form = $('#' + opts.formId);
        var $submitBtn = $('#' + opts.submitBtnId);

        bindSubmit(
            $form,
            $submitBtn,
            opts.success,
            opts.loadingText,
            opts.successTooltipText
        );
    };

    function bindSubmit($form, $submitBtn, successFn, loadingText, successTooltipText) {
        if (successTooltipText != undefined) {
            $submitBtn.tooltip({
                trigger: 'manual',
                title: successTooltipText
            });
        }

        var $nonFieldErrors = $form.find('.non-field-errors');

        var defaultText = $submitBtn.html();

        $submitBtn.click(function (e) {
            e.preventDefault();

            if (loadingText != false) {
                $submitBtn.html(loadingText);
            }

            var data = $form.serialize();

            $.ajax({
                url: $form.attr('action'),
                method: $form.attr('method'),
                data: data
            }).done(function (data) {
                $form.find('.errorlist').remove();
                $nonFieldErrors.empty();

                if (data.ok) {
                    if (successFn != undefined) successFn(data);
                    if (data.redirect) window.location = data.redirect;

                    if (successTooltipText != undefined) {
                        $submitBtn.tooltip('show');

                        setTimeout(function () {
                            $submitBtn.tooltip('hide');
                        }, 500);
                    }

                    return;
                }

                if (Array.isArray(data.errors)) {  // Formset errors
                    for (var i = 0; i < data.errors.length; i++) {
                        showErrors($form, $nonFieldErrors, 'form-' + i + '-', data.errors[i]);
                    }
                } else {  // One form
                    showErrors($form, $nonFieldErrors, '', data.errors);
                }

            }).always(function () {
                if (loadingText != false) {
                    $submitBtn.html(defaultText);
                }
            });
        });
    }

    function showErrors($form, $nonFieldErrors, prefix, errors) {
        for (var field_name in errors) {
            var field_errors = errors[field_name];

            if (field_name == '__all__') {
                var group = $nonFieldErrors;
            } else {
                var $input = $form.find(':input[name="' + prefix + field_name + '"]');
                if ($input.is(":hidden")) continue;

                var group = $input.parents('.form-group');
            }

            var errors_html = '<ul class="errorlist">';
            for (var i = 0; i < field_errors.length; i++) {
                errors_html += '<li>' + field_errors[i] + '</li>';
            }
            errors_html += '</ul>';

            $(group).append($(errors_html));
        }
    }
}(jQuery));
