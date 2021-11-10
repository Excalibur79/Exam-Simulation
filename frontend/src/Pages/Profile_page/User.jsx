import React, { useState, useEffect } from "react";
import styled from "styled-components";
import user from '../../../assets/user.png';
import PublishIcon from '@material-ui/icons/Publish';
import CancelIcon from '@material-ui/icons/Cancel';

const User = () => {



    const [count, setCount] = useState(0);
    const [read, setRead] = useState(0);
    const [follower, setFollower] = useState(0);
    const [allowEdit, setallowEdit] = useState(false);
    const [removePhoto, setremovePhoto] = useState(false);
    const [profilePhoto, setprofilePhoto] = useState(user);
    const [publishPhoto, setpublishPhoto] = useState(false);
    const [desc, setdesc] = useState("");
    const [imgUrl, setimageUrl] = useState(null);

    const [test, setTest] = useState(false);



    const remove = () => {

        setremovePhoto(true);
        setprofilePhoto(user);

    }

    const Edit = () => {
        const uid = auth.currentUser.uid;
        setallowEdit(true);
    }



    const [imageCropped, setimageCropped] = useState(false);
    const [image, setImage] = useState(null);
    const types = ["image/png", "image/jpeg", "image/jpg"];
    const [fileselect, setfileselect] = useState(null);

    var getFileBlob = function (url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.addEventListener('load', function () {
            cb(xhr.response);
        });
        xhr.send();
    };
    const handleChange = (e) => {
        let selectedFile = e.target.files[0];
        setfileselect(URL.createObjectURL(selectedFile));
        if (selectedFile) {
            console.log('a')
            if (types.includes(selectedFile.type)) {
                setImage(selectedFile);

            } else {
                console.log('b')
                setImage(null);
            }
        }
    };
    useEffect(() => {
        if (!fileselect)
            setTest(false);
        else
            setTest(!test);

    }, [fileselect])



    return (
        <>

            <div>
                <Detail>
                    <input
                        type="file"
                        id='input-file'
                        name="image"
                        accept="image/x-png,image/gif,image/jpeg,image/jpg"
                        onChange={handleChange}
                        style={{ visibility: 'hidden', position: 'absolute' }}
                    />
                    {uid === id ?
                        <SideContent>
                            {imageCropped ? <Image profilePhoto={fileselect} /> : <Image profilePhoto={profilePhoto} />}
                            {allowEdit ?
                                profilePhoto !== user ? removePhoto ? <Label fileselect={fileselect} for='input-file' style={{ marginRight: '10vw' }}><PublishIcon onClick={(e) => setpublishPhoto(true)} color='primary' style={{ position: 'absolute', marginLeft: '4.5vw', marginTop: '0.7vh', cursor: 'pointer' }} /></Label>
                                    : <CancelIcon color='secondary' style={{ position: 'absolute', marginLeft: '4.5vw', marginTop: '0.7vh', cursor: 'pointer', marginTop: '1vh' }} onClick={remove} />
                                    : <Label fileselect={fileselect} for='input-file' style={{ marginRight: '10vw' }}><PublishIcon onClick={(e) => setpublishPhoto(true)} color='primary' style={{ position: 'absolute', marginLeft: '4.2vw', marginTop: '0.7vh', cursor: 'pointer' }} /></Label> : null}
                            {/* <Button>Following</Button> */}
                            {allowEdit ? <Button onClick={save}>Save</Button> : <Button onClick={Edit}>Edit</Button>}
                            {publishPhoto & test === true ? <SimpleModal fileselect={fileselect} setfileselect={setfileselect} setimageCropped={setimageCropped} height={298} width={398} setTest={setTest} /> : null}
                        </SideContent> : <SideContent><Image profilePhoto={profilePhoto} />{isfollow === true ? <Button onClick={Tounfollow}>Following</Button> : <Button onClick={Tofollow}>Follow</Button>}</SideContent>}
                    <Bio>
                        <Name maxLength='40' minLength='1' value={name} disabled={!allowEdit} onChange={e => setname(e.target.value)} />
                        <Lines maxLength='237' minLength='1' cols='5' disabled={!allowEdit} value={desc} onChange={e => setdesc(e.target.value)}></Lines>
                        <Tabs>
                            <Tab>Folios <span >{count}</span></Tab>
                            <Tab>Reads <span >{read}</span></Tab>
                            <Tab>Followers <span >{follower}</span></Tab>
                        </Tabs>
                    </Bio>
                </Detail>
                <hr style={{
                    height: "0.45vh",
                    border: "none",
                    width: "107.4vw",
                    background: "#5DB0D8",
                }}></hr>
                <Bottom>
                    <div className="container">
                        <div class="row">


                            {post &&
                                post.map(p => {
                                    return (<div className="col-xs-12 col-sm-12 col-md-6 col-lg-2">{uid === id ? <ProfileTile Title={p.title} Image={p.img_url} id={p.id} onclick={tileclick} read={p.read_Count} deleted={delete_folio} /> : <Tile Title={p.title} Image={p.img_url} id={p.id} onclick={tileclick} Name={p.name} read={p.read_Count} />}</div>);
                                })}
                        </div>
                    </div>

                </Bottom>
            </div>
            <Div count={count}>
                <FooterNew fullength={count === 0 ? true : false} />
            </Div>
        </>
    )
}

export default User;

const Label = styled.label`
    position: absolute;
    
`

const Div = styled.div`
    position: absolute;
    margin-top: ${props => props.count === 0 ? '29.7vh' : '21.5vh'}
`

const Detail = styled.div`
position:relative;
margin-top: 7.61vh;
display:flex;
justify-content:center;
/* border:2px solid red; */
`
const Bottom = styled.div`
    /* border-top: 3px solid #5DB0D8; */
    min-width: 87.84vw;
    margin-left:auto;
    margin-right:auto;
    position:relative;
    margin-top: 22.83vh;
    display:flex;
    flex-wrap:wrap;
    flex-direction:row;
    justify-content:center;
    margin-top: 1.5vh;
    padding-top: 0.76vh;

    /* border:1px solid orange; */
    /* height: 292px; */
`

const Bio = styled.div`
position: absolute;
margin-left: 13vw;

`
const Tabs = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-around;
`
const Tab = styled.div`
    position:relative;
    display:flex;
    span{
        margin-top: 3vh; 
    color:black;
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 2.9vh;
    }
    
   
    color: #7D7B7B;
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 2.28vh;
    text-align: center;
    
    flex-direction:column;
    justify-content:space-between;
`
const SideContent = styled.div`
margin-left: -27.1vw;
padding-top: 3vh;
padding-left: 1.46vw;
padding-right: 1.46vw;
/* width:200px; */
display:flex;
flex-direction:column;
    /* border:1px solid green; */

`;
const Button = styled.button`
 width: 10vw;
height: 5.63vh;
left: 33.82vw;
top: 47.18vh;
border:none;
font-family: Rubik;
font-style: normal;
font-weight: normal;
font-size: 19px;
line-height: 3.5vh;
text-align: center;
margin-bottom: 2.43vh;

color: #FFFFFF;


background: #5DB0D8;
border-radius: 16px;
`
const Image = styled.img.attrs(props => ({
    src: props.profilePhoto

}))`
    
    width: 10vw;
height: 20.85vh;
   margin-bottom: 3.95vh;
border-radius: 20px;
`
const Name = styled.input`
position: absolute;
margin-top: 3vh;
margin-bottom: 2vh;
width: 27.16vw;
text-overflow: ellipsis;
height: 3.65vh;
font-family: Rubik;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 3.65vh;
color: #000000;
background-color:#fff;
&:focus{
    border: none;
    outline: none;
}
&:disabled{
    
    border: none;
}
&::placeholder{
    color: black;
}
`
const Lines = styled.textarea`
resize: none;
width: 27.16vw;
height: 19vh;
margin-top: 7vh;
background-color:#fff;
&:focus{
    border: none;
    outline: none;
}
&:disabled{
   
    border: none;
}
&::placeholder{
    color: black;
}
overflow: hidden;

`