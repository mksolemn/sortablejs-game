$(document).ready(function () {

    // plugin customization
    $.fn.customizeSortable = function (options) {

        // BEGIN setup sortable column
        Sortable.create(cardcol1, {
            animation: 200,
            group: {
                name: "shared",
                pull: "clone",
                put: false,
                revertClone: true,
            },
            sort: false
        });

        Sortable.create(cardcol2, {
            animation: 200,
            group: {
                name: "shared",
                pull: "clone",
                put: false,
                revertClone: true
            },
            sort: false,
        });


        var sortable = Sortable.create(lineup, {
            group: "shared",
            pull: false,
            onAdd: function () {
                uniqueItem();
                numbering();
            },
            onSort: function(){
                numbering();
            }
        });

        // END setup sortable column

        var settings = $.extend({
            maxValues: 10,
            cardContainer: $('.selection'),
            receivingContainer: $('.lineup'),
            item: '.list-group-item',
            removeElement: $('.remove-ico'),
            itemPosition:'.position'

        });

        var counter = 0;

        // if selection group item matches lineup item = disable that item
        // check each time 'mouseleaves' lineup container

        var uniqueItem = function (removedItem) {

            var allCards = settings.cardContainer.find(settings.item);
            var addedItems = settings.receivingContainer.children();

            //loop through receiving container elements
            for (var i = 0; addedItems.length > i; i += 1) {
                for (var j = 0; allCards.length > j; j += 1) {
                    if ($(allCards[j]).attr('data-title') == $(addedItems[i]).attr('data-title')) {
                        $(allCards[j]).addClass('alert-info').css('pointer-events', 'none');
                    }
                    // remove item classes
                    if ($(allCards[j]).attr('data-title') == $(removedItem).attr('data-title')) {
                        $(allCards[j]).removeClass('alert-info').css('pointer-events', 'auto');
                    }
                }
            }
        }

        var numbering = function(){
            $(settings.receivingContainer).find(settings.item).each(function(i){
                $(this).find($(settings.itemPosition)).text(i+1)
            })
        }
        

        // events
        settings.removeElement.on('click', function () {
            uniqueItem($(this).parents(settings.item));
            $(this).parents(settings.item).remove();
            numbering();
        })

        // disable drag and drop to the container
        settings.cardContainer.on('mouseenter', function () {
            counter = settings.receivingContainer.find(settings.item).length;
            if (counter >= settings.maxValues) {
                sortable.option("disabled", true); // set
            }
        });

        // enable container sorting when mouse enters
        settings.receivingContainer.on('mouseenter', function () {
            sortable.option("disabled", false);
        });

    }


    // plugin to selector
    $('.game-wrapper').customizeSortable({

    });

})
