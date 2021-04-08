// import React from 'react'
import './ListItems.css'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import FlipMove from 'react-flip-move';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

toast.configure()
function ListItems(props) {
    let items = props.items;
    items= items.sort(function(x,y){
        return y.key - x.key;
    })
    const listItems = items.map(item => { 
    return <div className="list" key={item.keyda}>
    <p>
        <textarea type="text"
        value={item.text} 
        id={item.key} 
        onChange = {
            (e) => {
                props.setUpdate(e.target.value, item.key)
            }
        }
        />
        <span id= "char">
            Max Character {item.text.length}/150
        </span>
    <span>
        <FontAwesomeIcon className="faicons" icon="trash" 
            onClick = { 
             () => props.deleteItem(item.key)
            }
        />
    </span>
    </p>
    </div>
    })

    return(<div>
        <FlipMove duration={500} easing="ease-in-out" >
                {listItems}
        </FlipMove>
         </div>
        )
}

export default ListItems;