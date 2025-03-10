<script>
document.addEventListener("DOMContentLoaded", () => {
    const title = document.getElementById("title");
    const text = "Avni Madhwesh";
    let index = 0;

    function typeEffect() {
        if (index < text.length) {
            title.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeEffect, 100);
        }
    }

    title.innerHTML = ""; // Clear existing text
    typeEffect();
});
</script>
