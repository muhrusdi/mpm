// created by muhrusdi
'use-strict';

$(function() {
	if ($(window).width() <= 768) {
		addClass();
	}
	$('#toggle-side').on('click', function() {
		$('.main > .m-content').toggleClass('margin-left margin-left-right');
		$('body').toggleClass('no-scroll-x');
		$('.main > .m-sidebar').toggleClass('margin-left margin-left-mobile');
		$('#globalfooter').toggleClass('margin-left');
	});
	if ($(window).resize(function() {
		if ($(window).width() <= 768) {
			addClass()			
		} else if ($(window).width() >= 768) {
			removeClass();
		}
	}));

	function addClass() {
		$('.main > .m-sidebar').addClass('margin-left-mobile');
		$('.main > .m-content').addClass('margin-left-right');			
		$('#globalfooter').addClass('margin-left');
	}

	function removeClass() {
		$('.main > .m-content').removeClass('margin-left');
		$('.main > .m-sidebar').removeClass('margin-left-mobile margin-left');
		$('#globalfooter').removeClass('margin-left');
	}

  String.prototype.replaceChar = function () {
     return(this.replace(/\b-(\w)/, function(str, p1) {
        return(str.slice(0, -1) + p1.toUpperCase());
    }));
  }

  function inputValidatedIv(page) {
    $('#'+ page +' input, #'+ page +' select').each(function(key, value) {
      if ($(value).is('input:text')) {
        validateForm(value, 'Masukkan ' + $(value).parent().find('label').text().replace(/[0-9]/g, "").replace('. ', '')); 
      } if ($(value).is('input[type=radio]')) {
        // validateForm(value, 'Checklist salah satu'); 
      } else if ($(value).is('select')) {
        validateForm(value, 'Pilih ' + $(value).parent().parent().find('label').text().replace(/[0-9]/g, "").replace('. ', ''));
      }
    }); 
  }

  function v1(name,name2) {
    var i = $('input[name="'+name+'"]');
    var iN = $('input[name="'+name2+'"]');
    var iv = i.closest('.checkbox').find('input[type=text]');
    var iNv = iN.closest('.checkbox-nest').find('input[type=text]');
    if ($(i).filter(':checked').length == 0) {  
      $(i).next('label').addClass('label-error');
    } else {
      if (name2 != '') {
        if (iN.filter(':checked').length == 0) {
          iN.next('label').addClass('label-error');
        }
      }
    }
    // if (i.closest('.checkbox').find('input[type=text]').length != 0) {
    //   if (i.closest('.checkbox').find('input[type=text]').val() == '') {
    //    i.closest('.checkbox').find('input[type=text]').addClass('error');
    //   }
    // }
    i.change(function() {
      if (i.filter(':checked').val() == 'on') {
        i.next('label').removeClass('label-error');
        iv.removeClass('error');
        i.removeClass('error');
        if (name2 != '') {
          if (iN.filter(':checked').length == 0) {
            iN.next('label').addClass('label-error');
          } else {
            iN.removeAttr('checked');

          }
        }
        if (iv.length != 0) {
          if (iv.val() == '') {
            iv.css('pointer-events', 'all');
            iv.addClass('error');
          }
          iv.keyup(function() {
            if ($(this).val().length > 0) {
              iv.removeClass('error');
            }
          });
        }
      }
    });

    iN.change(function() {
      if (name2 != '') {
        if (iN.filter(':checked').val() == 'on') {
          iN.next('label').removeClass('label-error');
          if (iNv.length != 0) {
            if (iNv.val() == '') {
              iNv.css({pointerEvents: 'all', opacity: '1'});
              iNv.addClass('error');
            }
            iNv.keyup(function() {
              if ($(this).val().length > 0) {
                $(this).removeClass('error');
              }
            });
          }
        }
      }
    });
  };

  function select1(message) {
    var el = $('#page-1 select');
    el.each(function(key,value) {
      if ($(value).val() == 0 || $(value).val() == null) {
        if ($('#error-'+ key).length == 0) {
          $(value).parent().addClass('error').after('<div id="error-' + key + '"" class="error">'+ message +'</div>');
        }
        if ($('.error').length > 0) {
          $('html, body').stop(true, false).animate({
            scrollTop: ($('.error').eq(0).offset().top + -100)
          }, 800);
        } 
      }
      $(value).change(function() {
        if ($(this).val() != 0) {
          $(this).parent().removeClass('error');
          $('#error-'+ key).remove();
        }
      });
    });
  }

  function validateForm(element, message) {
    var el = $(element);
    var id = el.attr('id');
    
    var key = el.attr('id')//.replaceChar().replace(/-/g, '');
    if (el.is(':text')) {
      if ($(el).val().length == 0) {
        $(el).addClass('error');
        if ($('#error-'+ id).length == 0) {
          $(el).after('<div id="error-' + id + '"" class="error">'+ message +'</div>');
        }
        if ($('.error').length > 0) {
          $('html, body').stop(true, false).animate({
            scrollTop: ($('.error').eq(0).offset().top + -100)
          }, 800);
        } 
      }

      $(el).keyup(function() {
        if ($(this).val().length > 0) {
          $(this).removeClass('error');
          $('#error-'+ id).remove();
        }
      });
      el.attr('value', el.val());
      // return {key: key, value: el.val()};
    } else if (el.is(':radio')) {
      // var name = el.attr('name');
      // if ( $('input[name="'+name+'"]:checked').length == 0) {
      //   if ($('.error-'+ name).length == 0) {
      //     if ($('.error-'+ name).length < 2) {
      //       // el.closest('.data-inner').find('.checkbox').after('<div class="error error-'+name+'">'+ message +'</div>');
      //       el.next('label').addClass('label-error');
      //     } 
      //   }
      //   if ($('.error').length > 0) {
      //     $('html, body').stop(true, false).animate({
      //       scrollTop: ($('.error').eq(0).offset().top + -100)
      //     }, 800);
      //   } 
      // }
      // $(el).change(function() {
      //   if ($(this).filter(':checked').val() == 'on') {
      //     $('.checkbox > div > label').removeClass('label-error');
      //   }
      // });
      // $('.checkbox > div > label').prev().change(function() {
      //   $('.checkbox-nest > div > label').prev().removeAttr('checked');
      // });
      // $('.checkbox-nest > div > label').prev().change(function() {
      //   if ($(this).is(':checked') == true) {
      //     $('.checkbox-nest > div > label').removeClass('label-error');
      //   }
      // });
    } else if (el.is(':checkbox')) {
      alert("checkbox");
    } else if (el.is('select')) {
      if (el.val() == 0 || el.val() == null) {
        if ($('#error-'+ id).length == 0) {
          el.parent().addClass('error').after('<div id="error-' + id + '"" class="error">'+ message +'</div>');
        }
        if ($('.error').length > 0) {
          $('html, body').stop(true, false).animate({
            scrollTop: ($('.error').eq(0).offset().top + -100)
          }, 800);
        } 
      }
      $(el).change(function() {
        if ($(this).val() != 0) {
          $(this).parent().removeClass('error');
          $('#error-'+ id).remove();
        }
      });
      el.attr('value', el.val());
      el.find('option[value="'+ el.val() +'"]').attr('selected', true);
    }
  }

  $('.checkbox input[type=radio]').not('.checkbox-nest').each(function(key, value) {
    $(value).on('click',function() {
      if ($(this).is(':checked')) {
        $(this).parent().find('.checkbox-nest > div > input[type=radio]').first().prop('checked', true);
      }
    });
  });

  // Cache Form

  var _form = $('#pendaftaran-ppfm');
  // _form.formcache();

  // Form Wizard
  var navFW = $('.mcf-wizard-step ul li a');
  navFW.on('click', function(e) {
    e.preventDefault();
    var f = $('#pendaftaran-ppfm').find('fieldset');
    var s = f.filter(e.target.hash);

    // if ($(this).filter('[href="'+e.target.hash+'"]').parent().index() == 0) {
    //   $(this).parent().removeClass('active');
    // }
    
    if ($(s).css('display') != 'block') {
      $(this).filter('[href="'+e.target.hash+'"]').parent().addClass('active');
      if ($(this).filter('[href="'+e.target.hash+'"]').parent().next() != 0) {
        $(this).filter('[href="'+e.target.hash+'"]').parent().next().removeClass('active');
        $(this).filter('[href="'+e.target.hash+'"]').parent().next().next().removeClass('active');
        $(this).filter('[href="'+e.target.hash+'"]').parent().next().next().next().removeClass('active');
      }

      if ($(this).filter('[href="'+e.target.hash+'"]').parent().index() == 2) {
        $(this).filter('[href="'+e.target.hash+'"]').parent().prev().addClass('active');
      }
      
      if ($(this).filter('[href="'+e.target.hash+'"]').parent().index() == 3) {
        $(this).filter('[href="'+e.target.hash+'"]').parent().prev().addClass('active');
        $(this).filter('[href="'+e.target.hash+'"]').parent().prev().prev().addClass('active');
      }
      $(s).show();
      f.not(e.target.hash).animate({opacity: 0}, {
        step: function(now, mx) {
          opacity = 1 - now;
          $(s).css({'opacity': opacity});
        },
        duration: 300, 
        complete: function(){
          f.not(e.target.hash).hide();
          animating = false;
        },
        easing: 'easeInOutBack'
      });
    }
  });

  var currentFs, nextFs, previousFs;
  var left, opacity;
  var animating;
  var c = $('#count-page');

  if ($('.mc-form-detail fieldset').css('display') == 'block') {
    c.text($('.mc-form-detail fieldset').index());
  }

  window.gNext = function(n) {
    if (animating) return false;
    animating = true;

    currentFs = $(n).closest('fieldset');
    nextFs = $(n).closest('fieldset').next();
    c.text(currentFs.index() + 1);
    $('.mcf-wizard-step ul li').eq($('fieldset').index(nextFs)).addClass('active');
    navFW.filter('[href="#'+nextFs.attr('id')+'"]').parent().removeClass('disabled');
    nextFs.show();
    currentFs.animate({opacity: 0}, {
      step: function(now, mx) {
        opacity = 1 - now;
        nextFs.css({'opacity': opacity});
      },
      duration: 300, 
      complete: function(){
        currentFs.hide();
        animating = false;
      },
      easing: 'easeInOutBack'
    });
  }

  window.gPrev = function(n) {
    if (animating) return false;
    animating = true;

    currentFs = $(n).closest('fieldset');
    nextFs = $(n).closest('fieldset').prev();
    c.text(currentFs.index() - 1);
    $('.mcf-wizard-step ul li').eq($('fieldset').index(currentFs)).removeClass('active');
    nextFs.show();
    currentFs.animate({opacity: 0}, {
      step: function(now, mx) {
        opacity = 1 - now;
        nextFs.css({ 'opacity': opacity});
      },
      duration: 300, 
      complete: function(){
        currentFs.hide();
        animating = false;
      },
      easing: 'easeInOutBack'
    });
  }

  function countPage() {
    var p = $('.mc-form-detail fieldset');
    var c = $('#count-page');

    if (p.css('display') == 'block') {
      c.text(p.index());
    }
  }

  $('#ttlKepRt').MonthPicker({ 
    Button: false,
    i18n: {
      year: 'Tahun',
      prevYear: '',
      nextYear: '',
      next12Years: '',
      prev12Years: '',
      nextLabel: 'selanjutnya',
      prevLabel: 'sebelumnya',
      jumpYears: '',
      backTo: 'Kembali ke',
      months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    } 
  });
});

$(function() {
  var h4 = $('.ml-form h4');
  var p = $('.ml-wrapper .footer a');

  p.on('click', function(e) {
    e.preventDefault();
    if ($('.ml-form .mlf-input').first().css('display') == 'block') {
      $('.ml-form .mlf-input').first().fadeToggle(function() {
        $('.ml-form .mlf-input').last().fadeToggle();
        h4.text('Masukkan alamat email anda.');
        p.text(' Kembali ke login.');
        p.prepend('<i class="uk-icon-angle-left"></i>');
      });
    } else {
      $('.ml-form .mlf-input').last().fadeToggle(function() {
        $('.ml-form .mlf-input').first().fadeToggle();
        h4.text('Silahkan login untuk mengakses halaman admin.');
        p.text('Lupa kata sandi?.');
      });
    }
  });

  // $('select').filter(':disabled').parent().removeClass('uk-button');

  $(window).load(function() {
    $('.main-login').addClass('zoom');
  });
});
