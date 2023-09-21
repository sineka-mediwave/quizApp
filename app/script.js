var groupSelect = document.getElementById("selectCategory");
var studentSelect = document.getElementById("categories");
var groupOptions = ["Computer Science", "Electronics ", "Internet of Things"];
var studentList1 = ["group1student1", "group1student2", "group1student3"];
var studentList2 = ["group2student1", "group2student2", "group2student3"];
var studentList3 = ["group3student1", "group3student2", "group3student3"];
// maps groups by name to their corresponding student list
var groupMapping = {
  "Computer Science": studentList1,
  "Electronics ": studentList2,
  "Internet of Things": studentList3,
};
// appends an array of options to a given select element
function appendOptions(selectElement, options) {
  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.textContent = option;
    optionElement.value = option;
    selectElement.appendChild(optionElement);
  });
}

// append group options
appendOptions(groupSelect, groupOptions);
groupSelect.addEventListener("change", (event) => {
  // clear student select only keeping the placeholder
  studentSelect.options.length = 1;
  // append student options using the mapping
  appendOptions(studentSelect, groupMapping[event.target.value]);
});
