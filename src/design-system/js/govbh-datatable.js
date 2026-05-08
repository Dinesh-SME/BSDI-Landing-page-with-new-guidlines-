//DATATABLE JS STARTS
$(document).ready( function () {

    var dtvars = [],
        dt_config = [];
    /*------------------------------------------*/
    /* datatable function */
    /*------------------------------------------*/
    function activate_datatable() {
        if (typeof dt_config !== 'undefined' && dt_config.length) {
        
            dt_config.forEach(function(dt_single_conf) {
                
                if ($(dt_single_conf.dt_table_id).length) {
                    
                    //$.fn.dataTable.moment( 'dd/mm/yyyy' );
                    
                    var dt_table = $(dt_single_conf.dt_table_id).DataTable( {
                        searching: dt_single_conf.dt_show_search_field ? true : false,
                        lengthChange: dt_single_conf.dt_lengthChange ? true : dt_single_conf.dt_lengthChange,
                        ordering: dt_single_conf.dt_ordering ? true : dt_single_conf.dt_ordering,
                        paging: dt_single_conf.dt_paging ? true : dt_single_conf.dt_paging,
                        info: dt_single_conf.dt_info ? true : dt_single_conf.dt_info,
                        responsive: dt_single_conf.dt_responsive ? false : dt_single_conf.dt_responsive,
                        fixedHeader: true,
                        autoWidth: false,
                        language: {
                            searchPlaceholder: dt_single_conf.dt_search_placeholder ? dt_single_conf.dt_search_placeholder : lang.dt_search,
                            search: "<i class='ph ph-magnifying-glass' aria-hidden='true'></i>",
                            info: dt_single_conf.dt_pagination_info_text ? dt_single_conf.dt_pagination_info_text : lang.dt_datatable_pagination_info,
                            paginate: {
                                next: dt_single_conf.dt_next ? dt_single_conf.dt_next : lang.dt_next,
                                previous: dt_single_conf.dt_prev ? dt_single_conf.dt_prev : lang.dt_previous,
                                first: dt_single_conf.dt_first ? dt_single_conf.dt_next : lang.dt_first,
                                last: dt_single_conf.dt_last ? dt_single_conf.dt_prev : lang.dt_last,
                            },
                            lengthMenu: dt_single_conf.dt_filter_show_menu_text ? dt_single_conf.dt_filter_show_menu_text : lang.dt_datatable_pagination_show_menu,
                            zeroRecords: dt_single_conf.dt_empty_table_text ? dt_single_conf.dt_empty_table_text : lang.dt_datatable_empty_table,
                            infoFiltered: dt_single_conf.dt_info_filtered_text ? dt_single_conf.dt_info_filtered_text : lang.dt_datatable_info_filtered,
                        },
                        columns: dt_single_conf.dt_width_declaration.length ? dt_single_conf.dt_width_declaration : null,
                        "columnDefs": [
                            {
                                "targets": dt_single_conf.dt_columns_to_hide,
                                "visible": false,
                                "searchable": true
                            },
                            {
                                targets: "_all",
                                createdCell: function(cell, cellData, rowData, rowIndex, colIndex) {
                                    truncate_text_within_cell(cell, cellData, rowData, rowIndex, colIndex, lang.dt_view_all, lang.dt_view_less);
                            }
                            }
                        ],
                        order: [[ 0, "asc" ]],
                        initComplete: function () {
    
                            this.api().columns().every( function () {
                                var column = this,
                                    column_index = column[0][0];
    
                                //if the column_index is in columns_to_filter array, then create a select filter
                                if (dt_single_conf.dt_columns_to_filter.hasOwnProperty(column_index)) {
                                    
                                    var label = dt_single_conf.dt_columns_to_filter[column_index].label,
                                        default_val = dt_single_conf.dt_columns_to_filter[column_index].default_val,
                                        label_class_onfocus =  '';
                                    
                                    // var select_container = $('<div class="form-label-group in-border" id="'+dt_single_conf.dt_table_id+'_select_container_'+column_index+'"><label class="'+label_class_onfocus+'label_select label_others" for="'+dt_single_conf.dt_table_id+'_col_index_'+column_index+'" >'+label+'</label></div>');
                                    var select_container = $('<div class="form-label-group in-border in-border select-filter-dt" id="'+dt_single_conf.dt_table_id+'_select_container_'+column_index+'"><label class="'+label_class_onfocus+'label_select label_others" for="'+dt_single_conf.dt_table_id+'_col_index_'+column_index+'" >'+label+'</label></div>');
                                    //$( dt_single_conf.dt_table_id + '_filter').prepend(select_container);
                                    $(select_container).insertBefore( $( dt_single_conf.dt_table_id + '_wrapper .dt-search'));
                                                            //.insertBefore( $( dt_single_conf.dt_table_id + '_filter').find('label'));
    
                                    var select = $('<select class="form-select custom-select" id="'+dt_single_conf.dt_table_id+'_col_index_'+column_index+'"></select>')
                                        .insertBefore('label[for="'+dt_single_conf.dt_table_id+'_col_index_'+column_index+'"]')
                                        .on( 'change', function () {
                                            var val = $.fn.dataTable.util.escapeRegex(
                                                $(this).val()
                                            );
    
                                            column
                                                .search( val ? '^'+val+'$' : '', true, false )
                                                .draw();
                                        } );
                                        
                                    select.append( '<option value="" selected>'+ default_val +'</option>' );
                                    column.data().unique().each( function ( d, j ) {
                                        if (dt_single_conf.dt_columns_to_filter[column_index].allowed_values.length) {
                                            if (dt_single_conf.dt_columns_to_filter[column_index].allowed_values.includes(d)) {
                                                select.append( '<option value="'+d+'">'+d+'</option>' );
                                            }
                                        } else {
                                            select.append( '<option value="'+d+'">'+d+'</option>' );
                                        }
                                    } );
                                }
    
                            } );
                            
                            //insert the daterangepicker filter
                            if (dt_single_conf.hasOwnProperty('dt_drp')) {
                                if (dt_single_conf.dt_drp.hasOwnProperty('filter')) {
                                    if (dt_single_conf.dt_drp.filter) {
                                        
                                        if (dt_single_conf.dt_drp.hasOwnProperty('single_field')) {
                                            //if single field datepicker
                                            if (dt_single_conf.dt_drp.single_field) {
                                                var dp_html = '<div class="drp single-field"><div class="form-label-group in-border">'+
                                                                    '<input type="text" class="form-control shadow-none" autocomplete="off" id="drp_picker'+dt_single_conf.dt_drp.fields_suffix+'" placeholder="'+dt_single_conf.dt_drp.single_field_label+'">'+
                                                                    '<label for="drp_picker'+dt_single_conf.dt_drp.fields_suffix+'" class="label label_others">'+dt_single_conf.dt_drp.single_field_label+'</label>'+
                                                                '</div></div>';
                                                    $( dt_single_conf.dt_table_id + '_filter').prepend(dp_html);
                                                    drp_config.push(
                                                        {
                                                            'single_drp_id': '#drp_picker'+dt_single_conf.dt_drp.fields_suffix, 
                                                            'dt_table_id' : dt_single_conf.dt_table_id,
                                                            'col_to_search': dt_single_conf.dt_drp.filter_col
                                                        }
                                                    );
                                            }
                                            
                                        } else {
                                            //if datepicker is composed of two fields
                                            var placeholder_start = 'placeholder="Start Date"',
                                                placeholder_end = ' placeholder="End Date"',
                                                start_id = 'start_date_'+dt_single_conf.dt_drp.fields_suffix,
                                                end_id = 'end_date_'+dt_single_conf.dt_drp.fields_suffix;
                                            /* if (isIE11) {
                                                placeholder_start = '',
                                                placeholder_end = '';
                                            } */
                                            var dp_html = '<div class="d-flex d-flex flex-lg-row flex-md-row flex-column justify-content-between drp">' +
                                                                '<div class="form-label-group in-border">' +
                                                                    '<input type="text" id="'+ start_id +'" class="form-control shadow-none" autocomplete="off" '+placeholder_start+'>'+
                                                                    '<label for="'+ start_id +'" class="label label_others">Start Date - End Date</label>'+
                                                                '</div>'+
                                                                '<span class="ms-2 drp-fields-separator"> - </span>'+
                                                                '<div class="form-label-group in-border end">'+
                                                                    '<input type="text" id="'+ end_id +'" class="form-control shadow-none" autocomplete="off" '+placeholder_end+'>'+
                                                                    '<label for="'+ end_id +'" class="label label_others">End Date</label>'+
                                                                '</div>'+
                                                            '</div>';
                                            $( dt_single_conf.dt_table_id + '_filter').prepend(dp_html);
                                            //push each daterangepicker config combination
                                            drp_config.push(
                                                {
                                                    'start_date_id': '#'+start_id, 
                                                    'end_date_id': '#'+end_id,
                                                    'dt_table_id' : dt_single_conf.dt_table_id,
                                                    'col_to_search': dt_single_conf.dt_drp.filter_col
                                                }
                                            );
                                        }
                                        
                                    }	
                                }
                                
                            }
                            
                            //change the bootstrap columns inside dataTables_wrapper to fix the IE11 issue
                            var filter_row = $( dt_single_conf.dt_table_id + '_wrapper > .row');
                            filter_row.children('div:eq(0)').attr('class','col-sm-12 col-md-3');
                            filter_row.children('div:eq(1)').attr('class','col-sm-12 col-md-9 search-filter-col');
    
                            //addClass to dataTables_filter to right align the items
                            $( dt_single_conf.dt_table_id + '_filter');
    
                            if (!dt_single_conf.dt_show_search_field) {
                                $( dt_single_conf.dt_table_id + '_filter').find('label:not(.label_select,.label_others)').remove();
                            } else {
                                //add invisible text to search filter label wrapper fix the error reported by WAVE tool
                                var search_filter = $( dt_single_conf.dt_table_id + '_filter').find('input[type="search"]');
                                search_filter.parents('label')
                                    .append('<span style="display:none">Search...</span>');
                            }
                        },
                        drawCallback: function (settings) {
                            setTimeout(function() {
                                //get breadcrumb container
                                var pc = $( dt_single_conf.dt_table_id + '_wrapper ul.pagination');
                                //get all pagination buttons
                                pc.find('button').each(function() {
                                    //get the text of each button
                                    var dt_idx = $(this).data('dt-idx');
                                    //if the text is not equal to the default text, then replace it with the default text
                                    if (dt_idx >=0 && typeof dt_idx === 'number') {
                                       var aria_label = lang.dt_pagination_label.replace('{0}', dt_idx + 1);
                                       $(this).attr('aria-label', aria_label);
                                    }
                                });
                            },500);
                        }
                    } );
                    
                    //Adding of Buttons Start
                    if (dt_single_conf.dt_show_buttons) {
                        new $.fn.dataTable.Buttons( dt_table, {
                            buttons: dt_single_conf.dt_button_items
                        } );
    
                        $('<div class="row"></div>').insertAfter( dt_single_conf.dt_table_id + '_wrapper .row:eq(1)');
                        //insert the buttons to our custom container
                        dt_table.buttons().container()
                            .appendTo( '#dt_buttons' );
    
                        //attach bootstrap attr's to each button and enable them
                        $('#dt_buttons').find('button')
                                    .attr('data-bs-placement', 'top')
                                    .attr('data-bs-toggle', 'tooltip')
                                    .tooltip();
                    }
                    //Adding of Buttons Ends
    
                    //Let's push each instance of dt_table to dtvars array so we can access its data anywhere within this script file
                    dtvars[dt_single_conf.dt_table_id] = dt_table;
                }
            });
            
        }
    }

    //Function that truncates cell within the cell and inserts a link View All / View Less
    function truncate_text_within_cell(cell, cellData, rowData, rowIndex, colIndex, view_all_text, view_less_text) {
        var $cell = $(cell)
        if (cellData != null) {
            var linebreakes = cellData.split(/\r\n|\r|\n|br/).length
        } else {
            var linebreakes = ''
        }
        if (!$(cell).hasClass('no-truncate')) {
            $(cell).contents().wrapAll("<div class='content'></div>");
            var $content = $cell.find(".content"),
                $ul = $(cell).find('ul.inside-table'),
                $height = '55px';
            if ($ul.length)
                $height = '62px';
                
            if (linebreakes > 3) {
                $content.css({
                    "height": $height,
                    "overflow": "hidden"
                })
                $(cell).append($("<button type='button' class='view-all'>" + view_all_text + "</button>"));
            }
            var $btn = $(cell).find("button.view-all");	
            if ($ul.length) {

                $btn.css({
                    'margin-left' : '25px'
                })
                
            }
            
            $cell.data("isLess", true);
            $btn.click(function() {
            var isLess = $cell.data("isLess");
            $content.css("height", isLess ? "auto" : $height)
            $(this).text(isLess ? view_less_text : view_all_text)
            $cell.data("isLess", !isLess)
            })
        }
        
    }

    //build a config for datatable
   
    $('.govbh-datatable').each(function() {

        //parse the cols from data-columns-to-hide
        var columns_to_hide = [],
            columnsToHideAttr = $(this).data('columns-to-hide');
        if (columnsToHideAttr && typeof columnsToHideAttr === 'string' && columnsToHideAttr.includes(',')) {
            columns_to_hide = columnsToHideAttr.split(',').map(Number);
        } else if (columnsToHideAttr >=0 && typeof columnsToHideAttr === 'number') {
            columns_to_hide = [columnsToHideAttr];
        }

        //parse the filters
        var dt_filters = $(this).find('.dt-filters'),
            dt_filter_obj = {

            };
        dt_filters.find('.dt-filter-item').each(function() {
            var dt_filter_col = $(this).data('column'),
                dt_filter_label = $(this).data('label'),
                dt_filter_default_label = $(this).data('default-val');
            if (dt_filter_col >=0 && typeof dt_filter_col === 'number') {
                dt_filter_obj[dt_filter_col] = {
                    label: dt_filter_label,
                    default_val: dt_filter_default_label,
                    allowed_values: []
                }
            }
        });

        var dt_entry = {
            dt_table_id: $(this).data('target-table-id'),
            dt_search_placeholder: $(this).data('search-placeholder-text'),
            dt_pagination_info_text: $(this).data('pagination-info-text'),
            dt_empty_table_text: $(this).data('empty-table-text'),
            dt_info_filtered_text: $(this).data('info-filtered-text'),
            dt_filter_show_menu_text: $(this).data('filter-show-menu-text'),
            dt_next: $(this).data('pagination-next-text'),
            dt_prev: $(this).data('pagination-prev-text'),
            dt_first: $(this).data('pagination-first-text'),
            dt_last: $(this).data('pagination-last-text'),
            dt_show_search_field: $(this).data('show-filter-fields'),
            dt_lengthChange: $(this).data('show-length-change'),
            dt_ordering: $(this).data('show-ordering'),
            dt_paging: $(this).data('show-paging'),
            dt_info: $(this).data('show-info'),
            dt_responsive: $(this).data('responsive'),
            dt_width_declaration: [ //leave the square brackets empty for columns autowidth
            ], 
            dt_show_buttons: false,
            dt_button_items: [],
            dt_columns_to_hide: columns_to_hide,
            dt_columns_to_filter: dt_filter_obj
        }
        //push the entry to dt_config arr
        dt_config.push(dt_entry);
    });
    
    //active datatable
    activate_datatable();

    //===== Trigger Click on checkboxes/radio
	//if clicked on row/td and if there's associated checkbox or radiobox, then trigger a click on it
	$(document).on('click', 'table.dataTable:not(.no-click-trigger,.calendar-table > table) td:not(.no-click-trigger)', function() {
        //$('table.dataTable:not(.no-click-trigger,.calendar-table > table)').find('td:not(.no-click-trigger)').click(function() {
            if (!$(this).hasClass('dtr-control') && $(window).width() >= 768) {
                var tr_elem = $(this).parents('tr');
                //console.log($(this).parents('tr').find('td:eq(0)').before());
                if (tr_elem.find('input:radio').length) {
                    $(this).parents('table.dataTable').find('tr').removeClass('clicked');
                    tr_elem.addClass('clicked');
                    $(this).parents('tr').find('input:radio').get(0).click();
                }
                if (tr_elem.find('input:checkbox').length) {
                    if (tr_elem.hasClass('clicked'))
                        tr_elem.removeClass('clicked');
                    else
                        tr_elem.addClass('clicked');
                    $(this).parents('tr').find('input:checkbox').not('[aria-label="form-switch"]').get(0).click();
                }
            }			
            //$(this).parents('tr').find('input[type="checkbox"],input[type="radio"]').trigger('click');
        });
        
        $(document).on('click', 'table.dataTable:not(.no-click-trigger) input:checkbox, input:radio', function() {
        //$('table.dataTable:not(.no-click-trigger) input:checkbox, input:radio').click(function() {
            var tr_parent = $(this).parents('tr'),
                table_parent = $(this).parents('table.dataTable');
            if ($(this).is(':checked')) {
                if ($(this).attr('type')=='radio') {
                    table_parent.find('tr').removeClass('clicked');
                }
                tr_parent.addClass('clicked');
            } else {
                tr_parent.removeClass('clicked');	
            }
        });
        
        $('.govbh-datatable__table--checkall').change(function() {
            var target = $(this).data('target');
            $(target).find('tr > td').click();
        });

} );
//DATATABLE JS ENDS
