function angryCat(text) {
  let pattern = /(?<=\s|^)([A-Za-z0-9][A-Za-z0-9.\-_]*)@[a-z]+\-?[a-z]+(\.[a-z]+)+/g

  let emails = text.match(pattern);

  for (let email of emails) {
    console.log(email)
  }
}
// solve("Please contact us at: support@github.com.");
// solve("Just send email to s.miller@mit.edu and j.hopking@york.ac.uk for more information.")
// solve("Many users @ SoftUni confuse email addresses. We @ Softuni.BG provide high-quality training @ home or @ class. –- steve.parker@softuni.de.")

function angryCat(text) {
  let regex =
    /(?<=\s|^)([A-Za-z0-9][A-Za-z0-9.\-_]*)@[a-z]+\-?[a-z]+(\.[a-z]+)+/g;
  let match = regex.exec(text);
  let result = [];

  while (match != null) {
    result.push(match[0]);
    match = regex.exec(text);
  }

  console.log(result.join("\n"));
}
angryCat("Please contact us at: support@github.com.");
angryCat(
  "Just send email to s.miller@mit.edu and j.hopking@york.ac.uk for more information."
);
angryCat(
  "Many users @ SoftUni confuse email addresses. We @ Softuni.BG provide high-quality training @ home or @ class. –- steve.parker@softuni.de."
);
