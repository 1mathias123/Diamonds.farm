$('#eth_amount').on("keyup", function() {
    document.getElementById('dim_amount').value = this.value*10
    document.getElementById('receive_amount').innerHTML = this.value*10
})

$('#dim_amount').on("keyup", function() {
    document.getElementById('eth_amount').value = this.value/10
    document.getElementById('receive_amount').innerHTML = this.value
})
