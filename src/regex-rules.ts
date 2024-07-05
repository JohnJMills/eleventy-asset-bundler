
const cssRules = [
  '(?<=href=").*.(css|scss|sass)(?=")',
  '(?<=\\(").*\\.(css|scss|sass)(?="\\))',
]

const jsRules = ['(?<=src=").*.(js)(?=")']

function setRegexRules (type: "js" | "css", rules: Array<String>) {
  // TODO: Add setter to override / append regex rules
}

function getRegexRules (type:  "js" | "css"): RegExp {
  switch (type) {
    case "css":
      return new RegExp(cssRules.join("|"), "g")
    case "js":
      console.log(new RegExp(jsRules.join("|"), "g"))
      return new RegExp(jsRules.join("|"), "g")
    default: 
      console.error("Invalid type for getRegexRules()")
      return
  }
}

export { getRegexRules, setRegexRules }