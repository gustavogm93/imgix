import React, { createContext, useEffect, useState } from "react";
import { Node, DoublyLinkedList } from "./doublyLinkedList";
import _ from "lodash";

export const SettingsContext = createContext();

/*
setting {
    value: 0
    active: false
}*/

String.prototype.replaceBetween = function (start, end, str) {
  return this.substring(0, start) + str + this.substring(end);
};

export const SettingProvider = ({ children }) => {
  const [value, setValue] = useState(0);
  const [active, setActive] = useState(false);
  const [pointer, setPointer] = useState(new Node(null));
  const [listOfActions, setListOfActions] = useState(
    new DoublyLinkedList(null)
  );

  const [query, setQuery] = useState("");
  const [url, setUrl] = useState("https://assets.imgix.net/unsplash/bear.jpg?");
  const [baseUrl, setBaseUrl] = useState(
    "https://assets.imgix.net/unsplash/bear.jpg?"
  );
  /*{

  mapValues: [{
    key: query e.g "bri"
    value {
      value: 0
      slideRef: 
      startIndexOfUrl
      lastIndexOfUrl
    }

  }]
  url: "bri=50&const=20", e.g
}*/
  /*
Undo Pointer = tail.prev

Redo Pointer = pointer.next


*/

  const handleUndo = () => {
    if (pointer.value || pointer.previous !== null) {
      const newPointer = Object.assign({}, pointer);

      newPointer.next = newPointer.value;
      newPointer.value = newPointer.previous || {
        setSlideValue: newPointer.value.setSlideValue,
      };

      const valSlide = _.get(newPointer.value, "value", 0);
      newPointer.value.setSlideValue(valSlide);
      setPointer(newPointer);
    }
  };

  const handleRedo = () => {
    if (pointer.next !== null) {
      const newPointer = Object.assign({}, pointer);
      newPointer.previous = newPointer.value;
      newPointer.value = newPointer.next;
      const query = _.get(newPointer.value, "query", "");
      const valSlide = newPointer.value.map.get(query).value || 0;
      newPointer.value.setSlideValue(valSlide);
      setPointer(newPointer);
    }
  };

  const handleSettings = ({ query, value, setSlideValue }) => {
    let _pointer;
    let _listOfActions = listOfActions; // = listOfActions ? listOfActions : new DoublyLinkedList();

    if (!pointer.value) {
      let _map = new Map();
      const urlToAppend = `${query}=${value}&`;
      const valuesOfMap = {
        value,
        beginIndexOfUrl: 0,
        endIndexOfUrl: urlToAppend.length - 1,
      };
      _map.set(query, valuesOfMap);
      const nodeValue = {
        map: _map,
        url: urlToAppend,
        query,
        setSlideValue,
      };

      _pointer = new Node(nodeValue);

      const newPointer = Object.assign({}, pointer);
      newPointer.value = nodeValue;
      setPointer(newPointer);

      const newList = Object.assign({}, listOfActions);
      newList.prepend(_pointer);
      setListOfActions(newList);
    } else {
      //if not exist query before
      if (!pointer.value.map.get(query)) {
        const url = pointer.value.url;
        const urlToAppend = `${query}=${value}&`;

        const valuesOfMap = {
          value,
          beginIndexOfUrl: url.length - 1,
          endIndexOfUrl: url.length + urlToAppend.length - 1,
        };
        const _map = pointer.value.map;
        //mapa a partir del viejo map
        _map.set(query, valuesOfMap);
        const nodeValue = {
          map: _map,
          url: `${url}${query}=${value}&`,
          query,
          setSlideValue,
        };
        //deberia tener el mapa completo con lo nuevo y viejo
        _pointer = new Node(nodeValue);

        pointer.next = _pointer;
        _pointer.previous = pointer;

        const newPointer = Object.assign({}, pointer);
        newPointer.value = nodeValue;
        newPointer.previous = pointer;

        setPointer(newPointer);

        _listOfActions.insert(_pointer);
        setListOfActions(_listOfActions);
      } else {
        //if exist query before
        const pointerUrl = pointer.value.url;
        const valuesOfMap = {
          value,
          beginIndexOfUrl: pointer.value.map.get(query).beginIndexOfUrl,
          endIndexOfUrl: pointer.value.map.get(query).endIndexOfUrl,
        };
        const _map = pointer.value.map;

        _map.set(query, valuesOfMap);
        const _url = pointerUrl.replaceBetween(
          valuesOfMap.beginIndexOfUrl,
          valuesOfMap.endIndexOfUrl,
          `${query}=${value}`
        );

        const nodeValue = {
          map: _map,
          url: _url,
          query,
          setSlideValue,
        };
        _pointer = new Node(nodeValue);

        pointer.next = _pointer;
        _pointer.previous = pointer;

        const newPointer = Object.assign({}, pointer);
        newPointer.value = nodeValue;
        newPointer.previous = pointer;

        setPointer(newPointer);

        listOfActions.insert(_pointer);

        let newList1 = Object.assign({}, listOfActions);
        newList1.insert(newPointer);
        setListOfActions(newList1);
        console.log("a");
      }
    }
  };

  useEffect(() => {
    const _url = _.get(pointer.value, "url", "");

    console.log(`${baseUrl}${_url}`);
    setUrl(`${baseUrl}${_url}`);
  }, [pointer]);

  const handleUrl = (urlAppend) => {
    const newUrl = url;
    setUrl(url);
  };

  const states = {
    query,
    value,
    active,
  };

  const actions = {
    handleSettings,
    handleUrl,
    handleUndo,
    handleRedo,
  };

  return (
    <SettingsContext.Provider value={{ states, actions }}>
      {children}
    </SettingsContext.Provider>
  );
};
