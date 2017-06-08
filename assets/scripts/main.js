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

  // Page 2
  var lists = [];
  var count = 0;

  $('.f-tambah-data').on('click', function() {
    inputValidatedIv();
    // if ($('#page-2 .error').length == 0) {
    var list = $('#fs-page-iv > li > ol');
    var raw = '<li class="uk-parent">'+
                '<a href="#"></a>'+
                '<ul class="uk-nav-sub">'+
                  '<li>'+
                    // $(mcfList).html()+
                  '</li>'+
                '</ul>'+
              '</li>';
    list.append(raw);
    var c = $('#fs-page-iv').next().clone();
    
    var item = $('#fs-page-iv > li > ol > li');

    parsing(c);
    
    // inputValidatedIv('page-2');
    $('#fs-page-iv').next().find('input, select').each(function(key, value) {
      $(value).val('').attr('value', '');
      if ($(value).is('select')) {
        $(value).find('option[selected="selected"]').removeAttr('selected');
        $(value).find('option[value="0"]').attr('selected', true);
      }
    });
    // }
  });

  var i = 0;

  function parsing(el) {
    el.find('input, select').attr('id', function(i, value) {
      return value + count;
    });

    var check = true;

    $('#fs-page-iv > li > ol > li').each(function(key, value) {
      if (el.find('input[id="nik-iv'+count+'"]').val() == $(value).find('input[id="nik-iv'+key+'"]').val()) {
        check = false;
      }
    })
    
    if (check) {
      $('#fs-page-iv > li > ol > li > ul > li').append(el);   
      
      $('#fs-page-iv > li > ol > li').each(function(key, value) {
        var n = $('[id="nama-iv'+ key +'"]').val() + ' ( ' +  $('[id="nik-iv'+ key +'"]').val() + ' )';
        $(value).children('a').text(n);
      });
      count++;
    } else {
      $('#fs-page-iv > li > ol > li:last-child').remove();
      el.remove();
      $.UIkit.notify("Data sudah siap di submit", {status:'warning', pos:'top-center'});
    }
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
      }

      if ($(this).filter('[href="'+e.target.hash+'"]').parent().index() == 2) {
        $(this).filter('[href="'+e.target.hash+'"]').parent().prev().addClass('active');
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
      console.log(s);
    }
  });

  var currentFs, nextFs, previousFs;
  var left, opacity;
  var animating;
  var c = $('#count-page');

  if ($('.mc-form-detail fieldset').css('display') == 'block') {
    c.text($('.mc-form-detail fieldset').index());
  }

  // $('.f-next').click(function() {
  //   var errorMessage = '';
  //   var errorCount = 0;
  //   var fs = $(this).closest('fieldset');
  //   v1('aset-bergerak-v', 'aset-bergerak');
  //   v1('rt-program-v', 'rt-peserta-program');
  //   v1('rt-aset-tidak-bergerak-v', 'aset-tidak-bergerak');
  //   v1('punya-aset-lain-g', '');
  //   v1('ternak-v', '');
  //   // inputValidatedIv('page-1');
  //   if ($('#page-1 .error').length != 0) {
  //     next(this);
  //   }
  // });


  $('.f-next').click(function() {
    // select1('Pilih salah satu');
    // v1('hasil-pencacahan-rt', '');
    // v1('penugasan-bangunan', '');
    // v1('jenis-lantai-luas', '');
    // v1('jenis-dinding-g', 'jenis-dinding');
    // v1('jenis-atap-g', 'jenis-atap');
    // v1('sumber-air-minum', '');
    // v1('status-lahan-tt', '');
    // v1('peroleh-air', '');
    // v1('sumber-penerangan-g', 'sumber-penerangan');
    // v1('bahan-bakar-masak', '');
    // v1('fasilitas-bab-g', 'fasilitas-bab');
    // v1('pembuangan-tinja', '');
    // if ($('#page-1 .error').length != 0) {
      next(this);
    // }
  });



  function next(n) {
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

  function prev(n) {
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

  $('.f-prev').click(function() {
    prev(this);
  });

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
      months: ['Januari', 'Februari', 'Maret', 'Mei', 'April', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    } 
  });
});