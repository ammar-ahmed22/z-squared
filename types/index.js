// module.exports = {}

export function isAmmar(who){
  if (typeof who === "string" && who === "boss"){
    return true;
  } else {
    return false;
  }
}

export function isRichTextContent(content){
  if ("plainText" in content && "annotations" in content){
    return true;
  } else {
    return false;
  }
}

export function isImageContent(content){
  if ("url" in content && "caption" in content && Array.isArray(content.caption)){
    return true;
  } else {
    return false;
  }
}

export function isListContent(content){
  if ("children" in content){
    return true;
  } else {
    return false;
  }
}

export function isEquationContent(content) {
  if ("expression" in content) {
    return true;
  } else {
    return false;
  }
}