import React ,{useCallback, useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import Select from 'react-select';
import * as constants from '../models/HRBSVals'

export default function RoomsCreate({room,buttonType}) {
    const history = useHistory();
    const moveToHome = useCallback(() => history.push('/roomsPage'), [history]);
    const roomTypeDDL = []
    const [RoomTypes,setRoomType] = useState({
        RoomType : []
    });
    const [roomType,setSelectedRoomType] = useState({
        label:'',
        key:0
    })
    const [roomDetails,setRoomDetails] = useState({
        RoomNo : 0,
        RoomFloor : 0,
        RoomTypeId : 0,
    })
    const [SelectedOption,setSelectedOption] = useState("");
    

    //component did mount
    useEffect(()=>{
        console.log(room);
        getRoomsType();
        RoomTypes.RoomType.forEach(element => {
            roomTypeDDL.push({
                label : element.roomsType1,
                value :element.roomsTypeId
            })
        });
        console.log(roomTypeDDL);
    },[])

    //functionality
    const getRoomsType = async ()=>
    {
        const requestOption = {
            method: 'GET',
            headers : {'Content-Type' : 'application/json'}
            //bearear informaion
        }
        try 
        {
            const result = await fetch(constants.getRoomsTypes, requestOption).then( response=> { return response.json()})
            .then(data=>
             {
                setRoomType({RoomType : data })
             })
        } catch (error) {
            alert("Please check connection to the Database")
        }
    }

    const handleRoomTypeIdChange = SelectedOption => {
        setSelectedRoomType({
              label : SelectedOption.label,
              key : SelectedOption.key
      })
      setRoomDetails({RoomNo : roomDetails.RoomNo , RoomFloor: roomDetails.RoomFloor,RoomTypeId:SelectedOption.key})
      setSelectedOption(roomType.label)
    }
      const showSelected = SelectedOption =>
        {
            alert("Selected: " +  roomType.label + ", "+ roomType.key);

        }

    const handleRoomNoChange=(e)=>{
        console.log(e.target.value)
        setRoomDetails({RoomNo : e.target.value , RoomFloor:roomDetails.RoomFloor,RoomTypeId:roomDetails.RoomTypeId})
    }
    const handleRoomFloorChange=(e)=>{
        setRoomDetails({RoomNo : roomDetails.RoomNo , RoomFloor:e.target.value,RoomTypeId:roomDetails.RoomTypeId})
    }

    const submitFormCreate = async () =>
    {
        if(roomDetails.RoomFloor===0 || roomDetails.RoomNo===0 || roomDetails.RoomTypeId ===0)
        {
            alert("Please enter RoomNo or Room floor or Sellect Room Type")
        }
        else
        {
            const roomInfo = {
                "roomsNo" : roomDetails.RoomNo,
                 "roomFloor" : roomDetails.RoomFloor,
                 "roomsTypeId" : roomDetails.RoomTypeId,
            }

            const requestOptions = {
                method:"POST",
                headers:{'Content-Type' : 'application/json'},
                body:JSON.stringify(roomInfo)
                 //bearer toker would go here
             }
            try
            {
                const result = await fetch(constants.getAllRoomsUrl, requestOptions)
                if(result.status===200){
                    moveToHome();
                }
            }
            catch(error){
                alert("Please check connection to the database")
             }
    }
}


  return (
    <div>
        RoomsCreate
        <br />
        <form action="">
            
        <Select
            value={SelectedOption}
            onChange={handleRoomTypeIdChange}
            style={{width: '320px'}} 
            options={RoomTypes.RoomType.map((roomType, index) => {
            return {
                label: roomType.roomsType1,
                value: roomType,
                key: roomType.roomsTypeId
                };
            })}
        />
            Selected Room Type : {roomType.label} <br />
            <label htmlFor="">Room No</label><br />
            <input type="text" name="" id="" value={roomDetails.RoomNo} onChange={handleRoomNoChange} /><br />
            <label htmlFor="">Room Floor</label><br />
            <input type="text" name="" id="" value={roomDetails.RoomFloor} onChange={handleRoomFloorChange} /><br />
            
            <input type="button" value="Create Room" onClick={submitFormCreate} />
            
        </form>
    </div>
  )
}
