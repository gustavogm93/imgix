import React, { createContext, useEffect, useState } from "react";
import { Node, DoublyLinkedList } from "./doublyLinkedList";
import _ from "lodash";

export const SettingsContext = createContext();

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

  const handleUndo = () => {
    if (pointer.value || pointer.previous !== null) {
      const newPointer = Object.assign({}, pointer);
      /*

    add bri50
    add con50

    undo -> bri50 pointer.value = bri50 next: bri50, con50

    undo -> value: null next bri50 next.next bri50.con50


      //next sea el actual bri50 con50 -----
      newPointer.next = newPointer;

      //el actual sea el previous
      newPointer.value = _.get(newPointer, "previous", null);

      //el previous sea el previous previous
      newPointer.previous = _.get(newPointer.previous, "previous", null);



*/
      //next sea el actual bri50 con50 -----
      const tempNext = newPointer.next;
      const tempPrev = newPointer.previous;
      newPointer.next = new Node(newPointer.value);
      newPointer.next.next = tempNext;
      newPointer.next.previous = tempPrev;

      //el actual sea el previous
      newPointer.value = _.get(newPointer, "previous.value", null);
      newPointer.previous = _.get(newPointer, "previous.previous", null);

      newPointer.next.previous = newPointer;

      //update query
      const query = _.get(newPointer.next, "value.query", null);

      //DEL CURRENT DEBERIA BUSJCAR LA QUERY. SI NO EXISTE ENTONCES PONEMOS 0 SI NO EL VALOR DEL ACTUAL
      const map = _.get(newPointer.value, "map", null);
      let val;
      if (!map) {
        val = 0;
      } else {
        const registry = newPointer.value.map.get(query);
        val = registry ? registry.value : 0;
      }
      newPointer.next.value.setSlideValue(val);
      setPointer(newPointer);
      /*
      const map = _.get(newPointer.value, "map", null);
      let val;
      if (!map) {
        val = 0;
      } else {
        const registry = newPointer.value.map.get(query);
        val = registry ? registry.value : 0;
      }
      
      newPointer.next.value.setSlideValue(val);
      */
    }
  };

  const handleRedo = () => {
    if (pointer.next !== null) {
      const newPointer = Object.assign({}, pointer);

      //el valor nuevo actual es el next
      newPointer = newPointer.next;

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
        slideValue: value,
        setSlideValue,
      };

      _pointer = new Node(nodeValue);

      const newPointer = Object.assign({}, pointer);
      newPointer.value = nodeValue;
      newPointer.next = null;
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
        const _map = new Map(pointer.value.map);
        //mapa a partir del viejo map
        _map.set(query, valuesOfMap);
        const nodeValue = {
          map: _map,
          url: `${url}${query}=${value}&`,
          query,
          slideValue: value,
          setSlideValue,
        };
        //deberia tener el mapa completo con lo nuevo y viejo
        _pointer = new Node(nodeValue);

        pointer.next = _pointer;
        _pointer.previous = pointer;
        /*
        const newPointer = Object.assign({}, pointer);
        newPointer.value = nodeValue;
        newPointer.previous = pointer;
        */
        _pointer.next = null;
        setPointer(_pointer);

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
        const _map = new Map(pointer.value.map);

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
          slideValue: value,
          setSlideValue,
        };
        _pointer = new Node(nodeValue);

        pointer.next = _pointer;
        _pointer.previous = pointer;

        const newPointer = Object.assign({}, pointer);
        newPointer.value = nodeValue;
        newPointer.previous = pointer;

        newPointer.next = null;
        setPointer(newPointer);

        listOfActions.insert(_pointer);

        let newList1 = Object.assign({}, listOfActions);
        newList1.insert(newPointer);
        setListOfActions(newList1);
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
    url,
    baseUrl,
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
