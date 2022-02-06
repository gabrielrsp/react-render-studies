import React, { useCallback, useMemo, useState } from 'react';
import { Item } from './components/Item';

function App () {

  const [items, setItems] = useState<string[]>([])
  const [newItem, setNewItem] = useState('')
  const [wishtList, setWishList] = useState<string[]>([])

  function addItemToList () {
    setItems([...items, `Item ${items.length}`])
  }

  //////////////////////////////////////////

  //SEM USE MEMO
  // const countItemsWithOne = () => (
  //   [
  //     console.log('test'),
  //     items.filter(item => item.includes('1')).length
  //   ]
  // )

  const countItemsWithOne = useMemo(() => (
    [
      console.log('test'),
      items.filter(item => item.includes('1')).length
    ]
  ), [items])  // array de dependencias para comparação

  //////////////////////////////////////////

  /*
    essa função será re-executada (sendo re-criado em memória) 
    se houver alguma alteração nesse componente
    ou seja, tudo que ela engloba entrará no fluxo de renderização,
    aqui nesse caso há renderizaçã por causa do onChange do Input
  */

  // function addItemToWishList (item: string) {
  //   setWishList([...wishtList, item])
  // }


  const addItemToWishList = useCallback((item: string) => {
    setWishList(state => [...state, item])
  }, [])

  return (
    <div>
      <input type="text" onChange={e => setNewItem(e.target.value)} value={newItem} />
      <button onClick={() => addItemToList()}>Add</button>
      <ul>
        {
          items.map(item => {
            return <Item key={item} onAddToWishList={addItemToWishList} title={item} />
          })
        }
      </ul>

      {/* <div>
        SEM USE MEMO
        Contagem: {countItemsWithOne()}
      </div> */}

      <div>
        COM USE MEMO - Só executará o console.log se alterar o 'items'
        O useMemo é para evitar RE-cálculos complexos
        Contagem: {countItemsWithOne}
      </div>

    </div>
  );
}

export default App;
