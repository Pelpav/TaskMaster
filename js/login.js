//Ajoute une classe 'glowIcon' à l'élément précédent avec la classe '.fa' lorsqu'un élément avec la classe '.input_text' est en focus
$(".input_text").focus(function(){
    $(this).prev('.fa').addclass('glowIcon')
})
//Supprime la classe 'glowIcon' de l'élément précédent avec la classe '.fa' lorsqu'un élément avec la classe '.input_text' perd le focus
$(".input_text").focusout(function(){
    $(this).prev('.fa').removeclass('glowIcon')
})

