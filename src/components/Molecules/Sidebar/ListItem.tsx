import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthenticator from '../../../hooks/useAuthenticator';
import '../../../styles/components/Organisms/Sidebar.scss';
import { ListItemProps } from '../../../types/props';
import { containsAll } from '../../../utils/utility';
import ListSubItem from '../../Atoms/Sidebar/ListSubItem';

export default function ListItem(props: ListItemProps) {
    const navigate= useNavigate();
    const [open, setOpen] = useState(false);
    const toogleDropper = () => {
        setOpen(!open);
    }

    return (
        <React.Fragment>
        
            <div className="list-items">
                <div className="d-flex">
                <p className="mb-0 mt-0" onClick={toogleDropper}>
                    {/* {props.item.name} */}
                    <span onClick={() => navigate(props.item.link!)}>{props.item.name}</span> 
           
                </p>
                <div onClick={toogleDropper} className="icon-holder d-flex">
                    {(props.item.subItems) ? 
                        open ? 
                        <img src='/icons/arrow-up.svg' alt='arrow-down' width={18} />:
                        <img src='/icons/arrow-down.svg' alt='arrow-down' width={18} />: null}
                </div>
                </div>
                {open ? 
                    <div className="subitem-area">
                        {props.item.subItems?.map((item, i) => (
                            <ListSubItem items={item} key={i} />
                        ))}
        
                    </div>
                    : null
            }
                
            </div>
       </React.Fragment>
    )
}