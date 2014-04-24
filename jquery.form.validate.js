// little validation jquery plugin
(function ($) {

    $.fn.reverse = [].reverse;

    function _formValidate($form) {
        var errors = 0;
        $form.find('.k-form-entry').reverse().each(function () {
            var $entry = $(this),
                $input = $entry.find('input, textarea'),
                regex = $input.attr('data-validator'),
                optional = $input.attr('data-validator-optional'),
                val = $input.val();
            if (!val && optional) {
                $entry.removeClass('error has-error');
            } else if (regex && regex.length) {
                var regexObject = new RegExp(regex);
                if (val.replace(/\n/g, '').match(regexObject)) {
                    $entry.removeClass('error has-error');
                } else {
                    errors++;
                    $entry.addClass('error has-error');
                    $input.focus();
                }
            }
        });
        return (errors === 0);
    }

    function _formReset($form) {
        $form.find('.k-form-entry').removeClass('error has-error');
    }

    function _formValues($form) {
        var values = {};
        $form.find('input, textarea').each(function () {
            values[$(this).attr('name')] = $(this).val();
        });
        return values;
    }

    $.fn.form = function (action) {
        switch (action) {
            case 'validate':
                return _formValidate($(this));
            case 'reset':
                return _formReset($(this));
            case 'values':
                return _formValues($(this));
        }
    };

})(jQuery);