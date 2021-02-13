$(function() {

    var template = $(".template").html();
    var $leftSide = $(".eleven-wide");
    var $input = $(".input-form");


        var statTemplate = $(".right-template").html();
        var $statLeft = $(".segment-left");
        var $statDone = $(".done");
        
    function addItem(name) {
        var quantity = 1;
        var $node = $(template);

        var $blLabel = $node.find(".count-label");

        var $notBuy = $node.find(".notbuy-button");
        var $productName = $node.find(".product-name");
        var $changeNameInput = $node.find(".change-input");

        var $plus = $node.find(".plus-button");
        var $minus = $node.find(".minus-button");
        var $delete = $node.find(".delete-button");
        var $buy = $node.find(".buy-button");
        
        var $statNode = $(statTemplate);        
        var $statProductName = $statNode.find(".product-left-name");
        var $statProductCount = $statNode.find(".product-counter");
              
        $minus.attr("disabled", true);
        
        
        $productName.text(name);
        $blLabel.text(1);
        
        $statProductName.text(name);
        $statProductCount.text(1);

        function buyClick() {
            $node.addClass("state-bought");
            $node.removeClass("state-not-bought");
            $statNode.remove();
            $statDone.append($statNode);
        }

        function notBuyClick() {
            $node.removeClass("state-bought");
            $node.addClass("state-not-bought");
            $statNode.remove();
            $statLeft.append($statNode);
        }
        
        $productName.click(function() {  

            var $oldName = $productName.text();
            $node.addClass("state-change-name");
            $node.removeClass("state-not-change-name");  



                var $newName = "";
                console.log("old name", $oldName);
                $changeNameInput.val($oldName);
        
            
            $changeNameInput.on("input", function() {
                if ($(this).val().length > 0) {
                    console.log("this name", $(this).val());
                    $newName=$(this).val();
                     console.log("new name", $newName);
                     $productName.text($newName);
                        $statProductName.text($newName);
                }
                     else{
                          $productName.text($oldName);
                             $statProductName.text($oldName);
                    }
            });
            
            $changeNameInput.focus();        
            $changeNameInput.focusout(function() {
                $node.removeClass("state-change-name");
                $node.addClass("state-not-change-name");
                
            });
        });
        
        function updateNode(node, fn) { node.fadeOut(250, function(){
            fn();
            node.fadeIn(250); });
        }
        function deleteItem() {
            $node.remove();
            $statNode.remove();
        }

        function plusOne() {
            quantity++;
            if (quantity > 1) {           
            $minus.attr("disabled", false);
            }
            $blLabel.text(quantity);
            $statProductCount.text(quantity);
        }

        function minusOne() {
            quantity--;
            if (quantity === 1) {           
            $minus.attr("disabled", true);
            }
            $blLabel.text(quantity);
            $statProductCount.text(quantity);
        }

           

            $buy.click(buyClick);
            $notBuy.click(notBuyClick);
            $delete.click(deleteItem);
            $plus.click(plusOne);
            $minus.click(minusOne);     
        

            $node.addClass("state-not-bought");
            $node.addClass("state-not-change-name");
        
     $leftSide.append($node);
        $statLeft.append($statNode);
    }

    $(".add-button").click(function() {
        var text = $input.val();
        if (text.length > 0) {
            addItem(text);
            $input.val("");
        }
        
        
        
        
    });
    $(".input-form").keypress(function(e) {
        if (e.which == 13) {
            var text = $input.val();
            if (text.length > 0) {
                addItem(text);
                $input.val("");
            }
        }
    });
    
    addItem("Помідори");
    addItem("Печиво");
    addItem("Сир");

});
