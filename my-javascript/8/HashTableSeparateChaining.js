function defaultToString(item) {
  if (item === null) {
    return "NULL";
  } else if (item === undefined) {
    return "UNDEFINED";
  } else if (typeof item === "string" || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}

class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  toString() {
    return `[#${this.key}:${this.value}]`;
  }
}

class HashTableSeparateChaining {
    constructor(toStrFn = defaultToString){
        this.toStrFn = toStrFn
        this.table ={}
    }
    put(key, value) {
        if(key != null && value != null){
            const position = this.hashCode(key)
            if(this.table[position] == null){
                this.table[position] = new LinkedList()
            }
            this.table[position].push(new ValuePair(key, value))
            return true
        }
        return false;
    }
    get(key){
        const position = this.hashCode(key)
        const linkedList = this.table[position]
        if(linkedList != null && !linkedList.isEmpty()){
            let current = linkedList.getHead()
            while(current != null){
                if(current.element.key === key){
                    return current.element.value
                }
                current = current.next
            }
        }
        return undefined
    }
    remove(key){
        const position = this.hashCode(key)
        const linkListed = this.table[position]
        if(linkListed != null && !linkListed.isEmpty()){
            let current = linkListed.getHead()
            while(current != null){
                if(current.element.key === key){
                    linkListed.remove(current.element)
                    if(linkListed.isEmpty()){
                        delete this.table[position]
                    }
                    return true
                }
                current = current.next
            }
        }
        return false
    }
}
