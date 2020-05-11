
const DemoComponent = React.createClass({
    render() {
        const friends = [
            {
                first_name: 'Harry',
                last_name: 'Potter',
                is_online: true,
            },
            {
                first_name: 'Lily',
                last_name: 'Potter',
                is_online: true,
            },
            {
                first_name: 'Foo',
                last_name: 'Bar',
                is_online: false,
            }
        ];

        return (
            <View>
                {friends
                    .filter(f => f.is_online)
                    .map(f => <View>{f.last_name}, {f.first_name}</View>)}
            </View>
        );
    }
});


.tzCheckBox{
    background:url('background.png') no-repeat right bottom;
    display:inline-block;
    min-width:60px;
    height:33px;
    white-space:nowrap;
    position:relative;
    cursor:pointer;
    margin-left:14px;
}

.tzCheckBox.checked{
    background-position:top left;
    margin:0 14px 0 0;
}

.tzCheckBox .tzCBContent{
    color: white;
    line-height: 31px;
    padding-right: 38px;
    text-align: right;
}

.tzCheckBox.checked .tzCBContent{
    text-align:left;
    padding:0 0 0 38px;
}

.tzCBPart{
    background:url('background.png') no-repeat left bottom;
    width:14px;
    position:absolute;
    top:0;
    left:-14px;
    height:33px;
    overflow: hidden;
}

.tzCheckBox.checked .tzCBPart{
    background-position:top right;
    left:auto;
    right:-14px;
}




(function($){
    $.fn.tzCheckbox = function(options){

        // Default On / Off labels:

        options = $.extend({
            labels : ['ON','OFF']
        },options);

        return this.each(function(){
            var originalCheckBox = $(this),
                labels = [];

            // Checking for the data-on / data-off HTML5 data attributes:
            if(originalCheckBox.data('on')){
                labels[0] = originalCheckBox.data('on');
                labels[1] = originalCheckBox.data('off');
            }
            else labels = options.labels;

            // Creating the new checkbox markup:
            var checkBox = $('<span>',{
                className   : 'tzCheckBox '+(this.checked?'checked':''),
                html:   '<span class="tzCBContent">'+labels[this.checked?0:1]+
                        '</span><span class="tzCBPart"></span>'
            });

            // Inserting the new checkbox, and hiding the original:
            checkBox.insertAfter(originalCheckBox.hide());

            checkBox.click(function(){
                checkBox.toggleClass('checked');

                var isChecked = checkBox.hasClass('checked');

                // Synchronizing the original checkbox:
                originalCheckBox.attr('checked',isChecked);
                checkBox.find('.tzCBContent').html(labels[isChecked?0:1]);
            });

            // Listening for changes on the original and affecting the new one:
            originalCheckBox.bind('change',function(){
                checkBox.click();
            });
        });
    };
})(jQuery);