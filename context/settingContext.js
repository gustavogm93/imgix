import React, { createContext, useEffect, useState } from "react";
import { Node, DoublyLinkedList } from "./doublyLinkedList";

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
  const [pointer, setPointer] = useState(new Node());
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
      startIndexOfUrl
      lastIndexOfUrl
    }

  }]
  url: "bri=50&const=20", e.g
}*/

  const handleSettings = ({ query, value }) => {
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
      };
      _pointer = new Node(nodeValue);

      const newPointer = Object.assign({}, pointer);
      newPointer.value = nodeValue;
      setPointer(newPointer);

      const newList = Object.assign({}, listOfActions);
      newList.head = _pointer;
      setListOfActions(newList);
    } else {
      //if not exist query before
      if (!pointer.value.map.get(query)) {
        const url = pointer.value.url;
        const urlToAppend = `${query}=${value}&`;

        const valuesOfMap = {
          value,
          beginIndexOfUrl: url.length() - 1,
          endIndexOfUrl: url.length + urlToAppend.length - 1,
        };
        const _map = new Map(pointer.map);

        _map.set(query, valuesOfMap);
        const nodeValue = {
          map: _map,
          url: `${url}${query}=${value}&`,
        };
        _pointer = new Node(nodeValue);

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
        };
        _pointer = new Node(nodeValue);

        pointer.next = _pointer;
        _pointer.previous = pointer;

        const newPointer = Object.assign({}, pointer);
        newPointer.value = nodeValue;
        newPointer.previous = pointer;

        setPointer(newPointer);

        let newList1 = Object.assign({}, listOfActions);
        newList1.insert(newPointer);
        setListOfActions(newList1);
        console.log("a");
      }
    }
    console.log(`${baseUrl}${pointer.url}`);
    setUrl(`${baseUrl}${pointer.url}`);
  };

  /*
  useEffect(() => {
    if (!query === 0) {
      return;
    }

    let urlReplaced = url;
    console.log(value, active, "aver");
    console.log(urlReplaced, "urlReplaced1");

    if (!active) {
      urlReplaced.replace(`${query}=${value}&`, "");
      setUrl(urlReplaced);
      return;
    }

    urlReplaced = `${urlReplaced}${query}=${value}&`;
    console.log(urlReplaced, "urlReplaced3");
    setUrl(urlReplaced);
    console.log(url, "final url");
  }, [value, active, query]);
 */
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
  };

  return (
    <SettingsContext.Provider value={{ states, actions }}>
      {children}
    </SettingsContext.Provider>
  );
};
