Array.from(document.querySelectorAll('nav a.title_nav')).forEach(function(element_a) {
    element_a.addEventListener('click', 
        function(event) {
            console.log(event);
            Array.from(document.querySelectorAll('.active')).forEach(function(element_section_ou_table) {
                element_section_ou_table.removeAttribute('class');
            });
            let element_a_id = event.target.attributes.href.value.replace('#', '');
            document.getElementById(element_a_id).setAttribute('class', 'active');
        }
    );
});
