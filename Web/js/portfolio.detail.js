/*!
	Machli - Creative Portfolio Bootstrap Template
	Copyright (c) 2013, Subramanian 

	Author: Subramanian
	Profile: themeforest.net/user/FMedia/

	Version: 1.0.0
	Release Date: November 2013	
 */

(function( $ ){	

	function detailPage(selector, params){
		// default variables
		var defaults = $.extend({}, { 
			filter 		: ".controls",
			buttonColor : ""

		} , params);
		
			var self = this;
			self.curSlide = 0;
			self.mainCont = $(selector);
			self.selEle = self.mainCont.find(".portfolio_items");
			self.filter = $(defaults.filter).find(".controls").length > 0 ? $(defaults.filter).find(".controls") : $(defaults.filter);
			self.portCat = $(defaults.filter);
			self.buttonColor = defaults.buttonColor;			
			self.proDetPos = 0;			
			self.posIt = false;
			self.backPage  = self.mainCont.find(".projDetailLoad");
			self.backPage.css({"height":"0px", "overflow":"hidden"});
			self.initPortfolioSlider();
	}
	
	
		
	detailPage.prototype = {
		
		showProject : function(e){
				
			var self = this;

			var p2 = e.split("=");
			
			self.cItem = p2[0];
			
			try{
				if(!self.filterEle[self.cItem].hasClass('active')){
					self.filterEle[self.cItem].trigger('click');
				}
			} catch (e) { }
					
			if(p2.length < 2){				
				if($("body").find('.mfp-wrap').length > 0){
					try{ $.magnificPopup.close(); } catch (e) { }
				} 
				return; 
			}
			
			try{			
				var fgr = self.selEle.find(".item .detail_btn");			
				
				
				var ppp = isNaN(fgr.parent().data("iii")) ? fgr.parent().parent() : fgr.parent();
				var mcc = ppp;	
				
				if(self.cItem == 0){
					self.curFmSlider = self.selEle.data("sArry");
				}else{
					self.curFmSlider = self.filterEle[self.cItem].data("sArry");
				}
				
				self.curSlide = Number(p2[1]);
				
				
				if(self.curFmSlider[self.curSlide].find(".detail_btn").attr("target") === undefined || self.fft ){
					setTimeout(function(){
						self.showDetailPage(self.curFmSlider[self.curSlide]);				
					},200);
				}

				
				
				if(self.curFmSlider[self.curSlide].find(".detail_btn").attr("target") === undefined){
					return false;
				}else{
					if(self.fft){						
						if(self.curFmSlider[self.curSlide].find(".detail_btn").attr("target") !== "_self"){
							window.open(
							  self.curFmSlider[self.curSlide].find(".detail_btn").attr("href"),
							  self.curFmSlider[self.curSlide].find(".detail_btn").attr("target")					  
							);
						}else{
							window.location.href = self.curFmSlider[self.curSlide].find(".detail_btn").attr("href");
						}
					}					
					self.fft = true;
				}
				
				
				
				
			} catch (e) { }			

		},
		
		// initPortfolioSlider function is used to create a portfolio and news items
 		
		initPortfolioSlider : function(){
			
			var self = this;
			//self.backPage.hide();
			
			self.filterArry = [];
			self.filterEle = [];
			
			
			
			self.filter.find(".filter").each(function(){								
				value = $(this).attr('data-filter');
				self.filterArry.push(value);
				self.filterEle.push($(this));
				var sArry = [];				
				self.filterEle[self.filterEle.length-1].data("sArry", sArry);
				self.filterEle[self.filterEle.length-1].data("jjj", -1);
				$(this).data("val_n", self.filterArry.length-1)
				
			});
			
			self.selEle.each(function(){
				var ff2 = $(this);
				var sArry = [];
				var iii = 0;
				ff2.data("slides",$(this).find('.item').length);
				
				try{
				  $(this).find('.item').each(function(){										
					  for(var hs = 0; hs < self.filterArry.length; hs++){							
						  if( $(this).hasClass(self.filterArry[hs])) {
							  
							  self.filterEle[hs].data("sArry").push($(this));								
							  self.filterEle[hs].data("jjj", self.filterEle[hs].data("jjj")+1);
							  $(this).data("jjj", self.filterEle[hs].data("jjj") );
						  }
					  }				
					  sArry.push($(this));
					  $(this).data("iii",iii++);
					  $(this).find('.flexSlideshow').addClass('flexslider');
					  $(this).data("details",$(this).find(".fullDetails"));
					  $(this).find(".detail_btn").data("mc",$(this));
					  $(this).find(".fullDetails").remove();
				  });
				  ff2.data("sArry",sArry);
				} catch (e) { }
			});
			
			self.cItem=0;

			self.filter.find(".filter").each(function(){
				$(this).click(function() {				
					var pgg = self.mainCont.attr("data-id") !== undefined ? self.mainCont.attr("data-id") : currentPage_menu;
					window.location.href = "#"+pgg+"?"+$(this).data("val_n");
					self.closeBackCon();
					
					
				});
			});
			
			self.navv = self.backPage.find(".itemNav");
			
			if(self.buttonColor == ""){
				self.navv.prepend('<div class="alignRight sliderNumber_pro">1/10</div>');
			}else{
				self.navv.prepend('<div class="alignRight sliderNumber_pro '+String(self.buttonColor)+'">1/10</div>');
			}
			
			self.n_sli = self.navv.children(":first-child");
			
			if(self.buttonColor == ""){
				self.navv.prepend('<a class="alignRight previous_button_pro"></a>');
			}else{
				self.navv.prepend('<a class="alignRight previous_button_pro '+String(self.buttonColor)+'"></a>');
			}
			self.p_Btn = self.navv.children(":first-child");
			
			
			if(self.buttonColor == ""){
				self.navv.prepend(' <a class="alignRight next_button_pro" ></a');
			}else{
				self.navv.prepend('<a class="alignRight next_button_pro '+String(self.buttonColor)+'"></a>');
			}
			self.n_Btn = self.navv.children(":first-child");
			
			if(self.buttonColor == ""){
				self.navv.prepend(' <a class="alignRight close_button_pro" ></a');
			}else{
				self.navv.prepend('<a class="alignRight close_button_pro '+String(self.buttonColor)+'"></a>');
			}
			
			self.c_Btn = self.navv.children(":first-child");
			
			self.n_Btn.click(function() {	
				self.fft = true;			
				self.cItem = 0;				
				for(var hs = 0; hs < self.filterEle.length; hs++){
					if( (self.filterEle[hs]).hasClass('active')) {
						self.cItem = hs;
					}
				}				
				self.curSlide = self.curSlide+1 < self.curFmSlider.length ? self.curSlide+1 : 0;
				var pgg = self.mainCont.attr("data-id") !== undefined ? self.mainCont.attr("data-id") : currentPage_menu;			
				window.location.href = "#"+pgg+"?"+self.cItem+"="+self.curSlide;
			});
			
			self.p_Btn.click(function() {
				self.fft = true;
				self.cItem = 0;				
				for(var hs = 0; hs < self.filterEle.length; hs++){
					if( (self.filterEle[hs]).hasClass('active')) {
						self.cItem = hs;
					}
				}				
				self.curSlide = self.curSlide-1 > -1 ? self.curSlide-1 : self.curFmSlider.length-1;
				var pgg = self.mainCont.attr("data-id") !== undefined ? self.mainCont.attr("data-id") : currentPage_menu;
				window.location.href = "#"+pgg+"?"+self.cItem+"="+self.curSlide;
			});
			
			self.c_Btn.click(function() {
				self.fft = true;
				self.posIt = true;
				var pgg = self.mainCont.attr("data-id") !== undefined ? self.mainCont.attr("data-id") : currentPage_menu;
				window.location.href = "#"+pgg;
				self.closeBackCon();
			});
			
			self.selEle.find(".item .detail_btn").click(function() {
				self.fft = true;
				var mcc = $(this);
				self.cItem = 0;				
				for(var hs = 0; hs < self.filterEle.length; hs++){
					if( (self.filterEle[hs]).hasClass('active')) {
						self.cItem = hs;
					}
				}
				
				var ppp = mcc.data("mc");
				if(self.cItem == 0){
					self.curFmSlider = self.selEle.data("sArry");
					self.curSlide = ppp.data("iii");
				}else{
					self.curFmSlider = self.filterEle[self.cItem].data("sArry");
					self.curSlide = ppp.data("jjj");
				}
				var pgg = self.mainCont.attr("data-id") !== undefined ? self.mainCont.attr("data-id") : currentPage_menu;
				
				self.firstTimeLoad = false;	
								
				if(mcc.attr("target") === undefined || mcc.attr("target") === ""){
					window.location.href = "#"+pgg+"?"+self.cItem+"="+self.curSlide;
					return false;
				}				
				
			});
				
		},

// Close projDetailLoad div
		closeBackCon : function(isPgPos){
			var self = this;

			self.selEle.find(".item").removeClass("active");
			
			try{ $.magnificPopup.close(); } catch (e) { }
			
			
			if(self.backPage.height() < 2){
				return;
			}

			self.backPage.css({"overflow":"hidden", "height": self.backPage.height(), "min-height": "0%" });
			if(!lowResDesktop){
				setTimeout(function(){
					self.backPage.animate({"height":0}, 500, "easeInOutQuart",function(){
						self.removeBackCon();
						if(!isPgPos){ $("body").mainFm('page_position'); }
						self.posIt = false;
					}, 500);
				});
			}else{
				self.backPage.stop().css({"height":0});
				self.removeBackCon();
				if(!isPgPos && !isMobileChk){ $("body").mainFm('page_position'); }
				self.posIt = false;
			}
		},

// Remove the content that load inside the projDetailLoad div
		removeBackCon : function(){
			var self = this;
			try{
				self.backPage.find(".slider_loading").each(function(){
					try{ $(this).remove();  } catch (e) { }
				});
			} catch (e) { }
			
			try{	
				for(var ss=0; ss < self.sliderArr.length; ss++){
					self.sliderArr[ss].pause();
					self.sliderArr[ss].destroy();
				}
				self.sliderArr=[];	
			} catch (e) { }			
			
			try{
				self.backPage.find('.flexSlideshow').each(function(){
					try{ $(this).flexslider("remove") } catch (e) { }
				});	
							
				self.backPage.find('.flexSlideshow').each(function(){
					try{ $(this).flexslider.remove()} catch (e) { };
				});				
			} catch (e) { }
			
			try{ 
				self.backPage.find("img").each(function(){
					try{ $(this).remove(); } catch (e) { }
				});
			} catch (e) { }
			
			try{ self.backPage.find(".projConWarp").remove();  } catch (e) { }
			
			self.selEle.find(".item").removeClass("active");
			
			self.posIt = false;

		},
		

// Show the details page		
		showDetailPage : function(el){

				var self = this;
				var pr = el;
				self.n_sli.text((self.curSlide+1)+"/"+(self.curFmSlider.length));
				

				if(pr.find("a.detail_btn").attr("href") === undefined || !pr){	
					if($("body").find('.mfp-wrap').length > 0){
						try{ $.magnificPopup.close(); } catch (e) { }
					}
				}
				
				if(!pr){ return; }
				
				// Remove the flex slider and content before load the new content

				if(pr.data("details").length == 0){
					self.backPage.stop();

					try { 
						for(var ss=0; ss < self.sliderArr.length; ss++){
							self.sliderArr[ss].pause();
						}
					} catch (e) { }			
								
					
					try { 
						if(self.backPage.height()>60){
							self.backPage.css({"overflow":"hidden", "height": self.backPage.height(), "min-height": "0%" });							
							if(!lowResDesktop){
									self.backPage.animate({"height":60}, 700, "easeInOutQuart",function(){
										self.removeBackCon();			
									});
							}else{
								self.backPage.stop().css({"height":60});
								self.removeBackCon();
							}
						}
					} catch (e) { }
					
					try {
						var itm = pr.find("a.detail_btn");
						if(itm.attr("href") !== undefined){		
									
							// Initialize Magnific popup plugin if required
							var youtubeUrl = itm.attr("href").match(/watch\?v=([a-zA-Z0-9\-_]+)/);
							var vimeoUrl = itm.attr("href").match(/^http:\/\/(www\.)?vimeo\.com\/(clip\:)?(\d+).*$/);
							var type__ = vimeoUrl ||  youtubeUrl ? 'iframe'  : 'image';
							
							if( itm.length>0){
								itm.magnificPopup({
									mainClass: 'mfp-with-zoom',
									removalDelay: 300,
								  items: {
									src: itm.attr("href"),
									title: itm.attr("data-title") !== undefined ? itm.attr("data-title") : itm.attr("title"),
									type: type__
								  }
								}).magnificPopup('open');
							}else{
								self.removeBackCon();	
							}
						}						
					} catch (e) { }	
					
					return;
				}
				
				self.backPage.show();
				
				// reset the detail page size 
				
				self.backPage.stop();				
				self.backPage.css({"height": self.backPage.height(), "overflow":"hidden"});
				
				var spp = self.backPage.height()<70 ? 0 : 500;
				var dCon = self.backPage.find(".projConWarp");
				
				if(!lowResDesktop){
					self.backPage.children(":last-child").animate({"opacity": "0"}, spp, "easeInOutQuart", function(){ 
						self.addNewContent(pr);
					});
				}else{
					self.backPage.children(":last-child").stop().css({"opacity": "0"});
					self.addNewContent(pr);
				}
		},	
		
		addNewContent : function(pr){
			var self = this;
			
			self.backPage.children(":first-child").css({"opacity": 1});							
			// Remove the previous page if it not remove completely
			self.posIt = true;
			self.removeBackCon();
			
			self.selEle.find(".item").removeClass("active");
			self.curFmSlider[self.curSlide].addClass("active");		
			
			self.pageScrollPos();
			
			// load the lazyload image
			if(pr.data("details").length>0){
				self.backPage.append('<div style="position:releative;" class="projConWarp"></div>');
				pr.data("details").clone().appendTo(self.backPage.children(":last-child"));
				
				self.backPage.find(".desktop_alignLeft").addClass("align_left_yes");
				
				if(pageAlignCenter){
					self.backPage.find(".desktop_alignLeft").removeClass("desktop_alignLeft");
				}
				
				self.backPage.children(":last-child").children(":last-child").css({"height":"auto", "width":"100%"});
				
				self.backPage.find(".max_height").each(function(){
					var se2 = $(this);
					if($(window).width() <= 979 ){
						se2.css({"height":"auto", "min-height":"auto"});
					}else{
						se2.css({"min-height": Math.round($(window).height()-  (self.curFmSlider[0].outerHeight() + self.mainCont.position().top)    )});
					}
								
				});
				
				self.backPage.children(":last-child").children(":last-child").find(" a.lazyload").each(function(){
					var img = !self.mobileDevice ? $(this).attr("href") : ($(this).attr("data-src-small")? $(this).attr("data-src-small")  :$(this).attr("href"));
					var cc = $(this).attr('class');
					$(this).replaceWith('<img class="'+cc+'" data-src="'+img+'"/>');
					$(this).removeClass('lazyload');
				});
			}
				
			self.detailNoMar = pr.data("details").hasClass("noMargin");
			
			self.intVideoObject(self.backPage);					
			
			// Add loading bar for each image and fadein the image after image completely load	

			self.backPage.children(":last-child").find("img").each(function(){	
				$(this).hide();

				var imSrc = $(this).attr("data-src") ? $(this).attr("data-src") : $(this).attr("src");
				var fxx = $(this).parent();
				if(!fxx.parent().hasClass("slides")){
					fxx.append('<div class="slider_loading" ></div>');
					if(self.selEle.hasClass("darkStyle")){
						fxx.children(":last-child").addClass("black")
					}
					fxx.children(":last-child").css({"top":fxx.height()/2-15, "left":fxx.width()/2-15 });
				}
				$(this).parent().find(".slider_loading").css({"left":0})
				$(this).attr('src', imSrc).load(function() {
					$(this).fadeIn(500);								
					$(this).parent().find(".slider_loading").remove();
				})
				.each(function() {
					if(this.complete) $(this).trigger('load');
				});
			});						
			
			// Store the flex slider in array
			self.sliderArr = [];
			self.backPage.find('.flexSlideshow').each(function(){
				try{
					var ffx = $(this);
					ffx.prepend('<div class="slider_loading" ></div>');
					ffx.children(":first-child").css({"top":ffx.height()/2-15});
					ffx.flexslider({
						slideshow: true,
						slideshowSpeed: self.flxDelay,
						start: function(slider){
							$(slider.slides.eq(0).html()).hide();
							$(slider.slides.eq(0).html()).attr('src', $(slider.slides.eq(0).html()).attr("src")).load(function() {
								ffx.find(".slider_loading").remove();
								$(slider.slides.eq(0).html()).fadeIn(300);
							}).error(function () { 
								ffx.find(".slider_loading").remove();
							}).each(function() {
							  if(this.complete) { $(this).trigger('load'); }
							});
							self.sliderArr.push(slider);
						}
					});
				} catch (e) { }	
			});
			
			self.backPage.css({"height": self.backPage.outerHeight()});
			self.update_pageHeight();
			
			
		},
		
		pageScrollPos : function(){
			var self = this;
			var curY = Math.round(self.curFmSlider[0].position().top);
					
			if(Math.round(curY) !==  Math.round(self.curFmSlider[self.curFmSlider.length-1].position().top)){
				for(var yu = 0 ; yu < self.curFmSlider.length ; yu++){
					if(Math.round(self.curFmSlider[yu].position().top) > curY){
						self.proDetPos = Math.round(self.curFmSlider[yu-1].position().top + 40);
						yu = self.curFmSlider.length;				
					}
				}
			}else{
				self.proDetPos = Math.round(self.curFmSlider[self.curFmSlider.length-1].position().top + 40 );
			}
			
			
		},	
			
		
		update_pageHeight : function(){
			var self = this;
			
			if(!lowResDesktop){
				self.backPage.children(":last-child").animate({"opacity":1}, 200, "easeInOutQuart");
			}else{
				self.backPage.children(":last-child").stop().css({"opacity":1});
			}
					
			// Show the full detail page					
					
			//var hhh = self.backPage.children(":first-child").outerHeight()+self.backPage.children(":last-child").outerHeight();
			//hhh = self.backPage.children(":last-child").outerHeight()>70 ? hhh : self.backPage.children(":first-child").outerHeight();

				if(!lowResDesktop){
					self.backPage.stop().animate({"height": $(window).height()+5 }, 500, "easeInOutQuart", function(){
						self.backPage.css({"height": "auto", "min-height": $(window).height()+5 });
						
						self.backPage.find('.addVideo').each(function(){
							if(!$(this).data("added")){
								var vid = $(this);
								var W = vid.attr('data-width') ? vid.attr('data-width') : "100%";
								var H = vid.attr('data-height') ? vid.attr('data-height') : "100%";
								var A = vid.attr('data-autoplay') == "true" && !self.mobileDevice? true : false;
								if(H == "100%"){
									vid.css({"height":"100%"})
								}
								vid.prepend('<div class="vid"></div>');
								vid.children(':first-child').embedPlayer(vid.attr('data-url'), W, H, A);
							}
						});
						
						self.pageScrollPos();
						
						try {
							if($(window).width() > 1519){
								if(onePageVersion){
									$("body").mainFm('page_position');
								}else{
									$("body").mainFm('page_position', self.portCat);
								}
							}else{
								$("body").mainFm('page_position', self.backPage);
							}
						} catch (e) { }
						
					});
				}else{
					self.backPage.stop().css({"height": "auto", "min-height": $(window).height()+5});
					
					self.backPage.find('.addVideo').each(function(){
						if(!$(this).data("added")){
							var vid = $(this);
							var W = vid.attr('data-width') ? vid.attr('data-width') : "100%";
							var H = vid.attr('data-height') ? vid.attr('data-height') : "100%";
							var A = vid.attr('data-autoplay') == "true" && !self.mobileDevice? true : false;
							if(H == "100%"){
								vid.css({"height":"100%"})
							}
							vid.prepend('<div class="vid"></div>');
							vid.children(':first-child').embedPlayer(vid.attr('data-url'), W, H, A);
						}
					});
						
					try {
						if($(window).width() > 1519){
							$("body").mainFm('page_position');
						}else{
							$("body").mainFm('page_position', self.backPage);
						}
					} catch (e) { }

				}
			
		},
		
		
		// Initialize video cover image
		intVideoObject : function(obj){
			var self = this;
			obj.find('.addVideo').each(function(){		
				var addCover = false;							
				$(this).find('.video_hover').each(function(){									
					addCover = true;
					var vv =  $(this);
									
					var vid = $(this).parent();
					vid.data("added", true);
									
					vv.click(function(){			
						$("body").find('.addVideo').each(function(){
							$(this).find('.vid').remove();
							$(this).find('img').fadeIn();
							$(this).find('.video_hover').fadeIn();
							$(this).find('.video_hover').css({"z-index":"5"});
						});
										
						vid.prepend('<div class="vid" ></div>');
						vid.find('.video_hover').css({"z-index":"-1"});
						vid.find('img').fadeOut(100,function(){
							var vid = $(this).parent();
							vid.children(':first-child').embedPlayer(vid.attr('data-url'), vid.width()+"px", vid.height()+"px", vid.width(), false);
							});								
						});
					});							
				});			
			}		
		},
	

	/*  Initizlize and create the slider plug-in */
	$.fn.detailPage = function(params) {
		var $fm = $(this);
		var instance = $fm.data('GBInstance');
		if (!instance) {
			if (typeof params === 'object' || !params){
				return $fm.data('GBInstance',  new detailPage($fm, params));	
			}
		} else {
			if (instance[params]) {					
				return instance[params].apply(instance, Array.prototype.slice.call(arguments, 1));
			}
		}
	};
	
	
})( jQuery );
