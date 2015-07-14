/**
 * Testing dateTimeRangePicker
 */
/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true, util:true, moment:true*/
'use strict';
describe('A dateTimeRangePicker widget',function(){
	var testContainer = window.formBuilderTesting.testContainer;
	var pause = window.formBuilderTesting.pause;
	var triggerWaitTime = window.formBuilderTesting.triggerWaitTime;

	it('can be created', function(){
		var div = $('<div class="dateRange"></div>').dateTimeRangePicker(); 

		expect(div.children().eq(0).is('.date-range-picker')).toBe(true);
		expect(div.children().text()).toBe('FromMM/DD/YYYYH:MMam/pmToMM/DD/YYYYH:MMam/pm<<CustomDayWeekMonthYear>>');
	});

	it('can get and set its data', function(){
		var picker = $('<div></div>').dateTimeRangePicker(); 
		var ddrw = picker.data('formBuilderDateTimeRangePicker');

		var date = {
			from: '2001-05-13T15:52:00Z',
			to: '2001-05-13T19:34:00Z',
			range: 'custom'
		};

		ddrw.set({
			from: '2001-05-13T15:52:00Z',
			to: '2001-05-13T19:34:00Z',
			range: 'custom'
		});

		expect(picker.dateTimeRangePicker('get')).toEqual(date);
	});

	it('can serialize its data', function(){
		var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 

		var date = '2013-01-01T05:00:00Z';

		expect(picker.dateTimeRangePicker('serialize', moment(date,'YYYY-MM-DD'))).toBe(date);
	});

	it('can deserialize its data', function(){
		var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 

		var date = '2013-01-01T05:00:00Z';

		expect(picker.dateTimeRangePicker('deserialize', date)).toEqual(moment(date,'YYYY-MM-DD'));
	});

	it('can clear its data', function(){
		var picker = $('<div class="dateRange"></div>').dateTimeRangePicker();
		var drpw = picker.data('formBuilderDateTimeRangePicker');

		var date = {
			from: '',
			to: '',
			range: 'custom'
		};

		drpw.set({
			from: '2001-05-13T15:52:00Z',
			to: '2001-05-13T19:34:00Z',
			range: 'custom'
		});

		drpw.clear();

		expect(drpw.get()).toEqual(date);
	});

	it('can check if its data is dirty', function(){
		var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 
		var ddrw = picker.data('formBuilderDateTimeRangePicker');

		spyOn(ddrw.form, 'formBuilder');

		picker.dateTimeRangePicker('isDirty');

		expect(ddrw.form.formBuilder).toHaveBeenCalled();
		expect(ddrw.form.formBuilder).toHaveBeenCalledWith('isDirty');
	});

	it('and can clear its dirty status', function(){
		var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 
		var ddrw = picker.data('formBuilderDateTimeRangePicker');

		spyOn(ddrw.form, 'formBuilder');

		picker.dateTimeRangePicker('clearDirty');

		expect(ddrw.form.formBuilder).toHaveBeenCalled();
		expect(ddrw.form.formBuilder).toHaveBeenCalledWith('clearDirty');
	});

	describe('has a range picker', function(){
		it('that can be created', function(){
			var div = $('<div class="dateRange"></div>').appendTo(testContainer).dateTimeRangePicker(); 

			var select = $(document).find('.range-select');
			var values = select.children().children().children().children().children();

			expect(select.length).toBe(1);
			expect(select.children().is('.input-field.undefined.select-fix')).toBe(true);
			expect(values.length).toBe(5);
			expect(values.eq(0).text()).toBe('Custom');
			expect(values.eq(1).text()).toBe('Day');
			expect(values.eq(2).text()).toBe('Week');
			expect(values.eq(3).text()).toBe('Month');
			expect(values.eq(4).text()).toBe('Year');

			testContainer.empty();
		});

		describe('and can set', function(){
			it('a day date range', function(){
				// Problem with moment where the miliseconds are lagging after running test 
				var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 
				var drpw = picker.data('formBuilderDateTimeRangePicker');

				var date = {
					from: '2001-05-13T00:00:00Z',
					to: '2001-05-13T23:59:00Z',
					range: 'day'
				};

				drpw.set({
					from: '2001-05-13T15:52:00Z',
					to: '2001-05-13T19:34:00Z',
					range: 'custom'
				});

				drpw.setRange('day');

				expect(drpw.get()).toEqual(date);
			});

			xit('a week date range', function(){
				var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 

				var from1 = moment().startOf('week');
				var to1 = moment().endOf('week');

				var from = picker.dateTimeRangePicker('serialize', from1);
				var to = picker.dateTimeRangePicker('serialize', to1);


				var date = {
					from: from, 
					to: to, 
					range: 'custom'
				};

				picker.dateTimeRangePicker('setRange', 'week');

				expect(picker.dateTimeRangePicker('get')).toEqual(date);
			});

			xit('a month date range', function(){
				var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 

				var from1 = moment().startOf('month');
				var to1 = moment().endOf('month');

				var from = picker.dateTimeRangePicker('serialize', from1);
				var to = picker.dateTimeRangePicker('serialize', to1);

				var date = {
					from: from, 
					to: to, 
					range: 'custom'
				};

				picker.dateTimeRangePicker('setRange', 'month');

				expect(picker.dateTimeRangePicker('get')).toEqual(date);
			});

			xit('and a year date range', function(){
				var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 

				var from1 = moment().startOf('year');
				var to1 = moment().endOf('year');

				var from = picker.dateTimeRangePicker('serialize', from1);
				var to = picker.dateTimeRangePicker('serialize', to1);

				var date = {
					from: from, 
					to: to, 
					range: 'custom'
				};

				picker.dateTimeRangePicker('setRange', 'year');

				expect(picker.dateTimeRangePicker('get')).toEqual(date);
			});

			xit('but will not set a custom date range', function(){
				var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 

				var date = {
					from: '01/01/2000', 
					to: '08/05/2015', 
					range: 'custom'
				};

				var date2 = {
					from: '', 
					to: '', 
					range: 'custom'
				};

				picker.dateTimeRangePicker('setRange', 'custom');

				expect(picker.dateTimeRangePicker('get')).toEqual(date2);
			});
		});
	});

	describe('has buttons', function(){
		it('that can be created', function(){
			var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateTimeRangePicker(); 

			// Test button creation
			var buttons = $(document).find('.ui-button');

			expect(buttons.length).toBe(2);
			expect(buttons.eq(0).is('.previous-range')).toBe(true);
			expect(buttons.eq(0).text()).toBe('<<');
			expect(buttons.eq(1).is('.next-range')).toBe(true);
			expect(buttons.eq(1).text()).toBe('>>');

			testContainer.empty();
		});

		describe('and can be used to move the date range forward', function(){
			xit('by one day', function(){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateTimeRangePicker(); 

				var buttons = $(document).find('.ui-button');
				
				var date = {
					from: '2000-01-02', 
					to: '2000-01-02',
					range: 'day' 
				};

				// var date2 = {
				// 	from: '2000-01-03', 
				// 	to: '2000-01-03', 
				// 	range: 'day' 
				// };

				picker.dateTimeRangePicker('set', date);

				buttons.eq(1).click();

				// expect(picker.dateTimeRangePicker('get')).toEqual(date2);

				//testContainer.empty();
			});

			xit('by one week', function(){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateTimeRangePicker(); 

				var buttons = $(document).find('.ui-button');

				var date = {
					from: '07/19/2015', 
					to: '07/25/2015', 
					range: 'week' 
				};

				var date2 = {
					from: '2015-07-26', 
					to: '2015-08-01', 
					range: 'week' 
				};

				picker.dateTimeRangePicker('set', date);

				buttons.eq(1).click();

				expect(picker.dateTimeRangePicker('get')).toEqual(date2);

				testContainer.empty();
			});

			xit('by one month', function(){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateTimeRangePicker(); 

				var buttons = $(document).find('.ui-button');

				var date = {
					from: '07/01/2015', 
					to: '07/31/2015', 
					range: 'month' 
				};

				var date2 = {
					from: '2015-08-01', 
					to: '2015-08-31', 
					range: 'month' 
				};

				picker.dateTimeRangePicker('set', date);

				buttons.eq(1).click();

				expect(picker.dateTimeRangePicker('get')).toEqual(date2);

				testContainer.empty();
			});

			xit('by one year', function(){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateTimeRangePicker(); 

				var buttons = $(document).find('.ui-button');

				var date = {
					from: '01/01/2015', 
					to: '12/31/2015', 
					range: 'year' 
				};

				var date2 = {
					from: '2016-01-01', 
					to: '2016-12-31', 
					range: 'year' 
				};

				picker.dateTimeRangePicker('set', date);

				buttons.eq(1).click();

				expect(picker.dateTimeRangePicker('get')).toEqual(date2);

				testContainer.empty();
			});
		});

		xit('but will not do anything if the custom type is selected', function(){
			var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateTimeRangePicker(); 

			var buttons = $(document).find('.ui-button');

			var date = {
				from: '01/01/2015', 
				to: '08/05/2015', 
				range: 'custom' 
			};

			var date2 = {
				from: '2015-01-01', 
				to: '2015-08-05', 
				range: 'custom' 
			};

			picker.dateTimeRangePicker('set', date);

			buttons.eq(1).click();

			expect(picker.dateTimeRangePicker('get')).toEqual(date2);

			testContainer.empty();
		});

		describe('and can be used to move the date range backward', function(){
			xit('by one day', function(){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateTimeRangePicker(); 

				var buttons = $(document).find('.ui-button');

				var date = {
					from: '01/02/2000', 
					to: '01/02/2000', 
					range: 'day' 
				};

				var date2 = {
					from: '2000-01-01', 
					to: '2000-01-01', 
					range: 'day' 
				};

				picker.dateTimeRangePicker('set', date);

				buttons.eq(0).click();

				expect(picker.dateTimeRangePicker('get')).toEqual(date2);

				testContainer.empty();
			});

			xit('by one week', function(){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateTimeRangePicker(); 

				var buttons = $(document).find('.ui-button');

				var date = {
					from: '07/19/2015', 
					to: '07/25/2015', 
					range: 'week' 
				};

				var date2 = {
					from: '2015-07-12', 
					to: '2015-07-18', 
					range: 'week' 
				};

				picker.dateTimeRangePicker('set', date);

				buttons.eq(0).click();

				expect(picker.dateTimeRangePicker('get')).toEqual(date2);

				testContainer.empty();
			});

			xit('by one month', function(){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateTimeRangePicker(); 

				var buttons = $(document).find('.ui-button');

				var date = {
					from: '07/01/2015', 
					to: '07/31/2015', 
					range: 'month' 
				};

				var date2 = {
					from: '2015-06-01', 
					to: '2015-06-30', 
					range: 'month' 
				};

				picker.dateTimeRangePicker('set', date);

				buttons.eq(0).click();

				expect(picker.dateTimeRangePicker('get')).toEqual(date2);

				testContainer.empty();
			});

			xit('by one year', function(){
				var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateTimeRangePicker(); 

				var buttons = $(document).find('.ui-button');

				var date = {
					from: '01/01/2015', 
					to: '12/31/2015', 
					range: 'year' 
				};

				var date2 = {
					from: '2014-01-01', 
					to: '2014-12-31', 
					range: 'year' 
				};

				picker.dateTimeRangePicker('set', date);

				buttons.eq(0).click();

				expect(picker.dateTimeRangePicker('get')).toEqual(date2);

				testContainer.empty();
			});
		});

		xit('but will not do anything if the custom type is selected', function(){
			var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateTimeRangePicker(); 

			var buttons = $(document).find('.ui-button');

			var date = {
				from: '01/01/2015', 
				to: '08/05/2015', 
				range: 'custom' 
			};

			var date2 = {
				from: '2015-01-01', 
				to: '2015-08-05', 
				range: 'custom' 
			};

			picker.dateTimeRangePicker('set', date);

			buttons.eq(0).click();

			expect(picker.dateTimeRangePicker('get')).toEqual(date2);

			testContainer.empty();
		});
	});

	xit('can switch the range type of the dates', function(){
		var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 
		var ddrw = picker.data('formBuilderDateTimeRangePicker');

		// var spy_de = spyOn(picker.dateTimeRangePicker(), 'deserialize').and.callThrough();

		var from = '01/01/2015';
		var from2 = '2015-01-02';
		var from3 = '2015-01-01';

		var date = {
				from: from, 
				to: from, 
				range: 'day' 
			};

		var date2 = {
				from: from2, 
				to: from2, 
				range: 'day' 
			};

		var date3 = {
				from: from3, 
				to: from3, 
				range: 'day' 
			};


		picker.dateTimeRangePicker('set', date);

		ddrw._moveRange(1, 'day');

		expect(picker.dateTimeRangePicker('get')).toEqual(date2);

		ddrw._moveRange(-1, 'day');

		expect(picker.dateTimeRangePicker('get')).toEqual(date3);
	});

	xit('can set its from and to fields', function(){
		var picker = $('<div class="dateRange"></div>').dateTimeRangePicker(); 
		var ddrw = picker.data('formBuilderDateTimeRangePicker');

		var from1 = moment();
		var to1 = moment();

		var from = picker.dateTimeRangePicker('serialize', from1);
		var to = picker.dateTimeRangePicker('serialize', to1);

		var date = {
			from: from, 
			to: to, 
			range: 'custom'
		};

   		ddrw._setFromAndTo(from, to); 

   		expect(picker.dateTimeRangePicker('get')).toEqual(date);
	});

	xit('can validate its input', function(){
		var picker = $('<div class="dateRange"></div>').appendTo(testContainer).dateTimeRangePicker(); 

		var date = {
			from: '01/01/2015', 
			to: '08/05/2015', 
			range: 'custom' 
		};

		picker.dateTimeRangePicker('set', date);

		expect(picker.dateTimeRangePicker('validate')).toBeTruthy();

		var date2 = {
			from: '13/01/2015',
			to: '08/05/2015', 
			range: 'custom' 
		};

		picker.dateTimeRangePicker('set', date2);

		expect(picker.dateTimeRangePicker('validate')).toBeFalsy();

		testContainer.empty();
	});
});