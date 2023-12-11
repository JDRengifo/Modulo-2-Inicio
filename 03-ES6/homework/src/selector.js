
// Función que recorre el DOM y recolecta elementos que coinciden con un criterio
var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];
 

  // Si no se proporciona un elemento de inicio, se utiliza el cuerpo del documento
  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // Función interna que realiza la recursión para recorrer el árbol DOM
  function traverse(currentEl) {
    // Verifica si el elemento actual coincide con el criterio
    if (matchFunc(currentEl)) {
      resultSet.push(currentEl);
    }

    // Recorre los nodos hijos
    for (var i = 0; i < currentEl.children.length; i++) {
      traverse(currentEl.children[i]);
    }
  }

  // Inicia la recursión desde el elemento de inicio
  traverse(startEl);

  return resultSet;
  
};

// Función que detecta y devuelve el tipo de selector
var selectorTypeMatcher = function (selector) {
  if (selector.startsWith("#")) {
    return "id";
  } else if (selector.startsWith(".")) {
    return "class";
  } else if (selector.includes(".")) {
    return "tag.class";
  } else {
    return "tag";
  }
};


// Función que crea y devuelve una función de coincidencia basada en el tipo de selector
var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;

  if (selectorType === "id") {
    // Si el selector es un id, crea una función que verifica si el id del elemento coincide
    matchFunction = function (el) {
      return el.id === selector.substring(1);
    };
  } else if (selectorType === "class") {
    // Si el selector es una clase, crea una función que verifica si el elemento tiene la clase
    matchFunction = function (el) {
      return el.classList.contains(selector.substring(1));
    };
  } else if (selectorType === "tag.class") {
    // Si el selector es de tipo tag.class, crea una función que verifica tanto la etiqueta como la clase
    var parts = selector.split('.');
    var tag = parts[0];
    var className = parts[1];
    matchFunction = function (el) {
      return el.tagName.toLowerCase() === tag && el.classList.contains(className);
    };
  } else if (selectorType === "tag") {
    // Si el selector es solo una etiqueta, crea una función que verifica la etiqueta
    matchFunction = function (el) {
      return el.tagName.toLowerCase() === selector.toLowerCase();
    };
  }

  return matchFunction;
};

// Función principal similar a jQuery que utiliza las funciones anteriores para seleccionar elementos
var $ = function (selector) {
  var elements;
  // Obtiene la función de coincidencia correspondiente al selector proporcionado
  var selectorMatchFunc = matchFunctionMaker(selector);
  // Utiliza la función de coincidencia para seleccionar elementos
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
