import JoditEditor from 'jodit-react'
import React from 'react'

const Jodit = ({joditBody,setJoditBody}) => {

     const joditConfig = {
            readonly: false,
            height: 400,
            resize: true,
            uploader: {
                insertImageAsBase64URI: true,
            },
            toolbarAdaptive: false,
            buttons: "bold,italic,underline,|,ul,ol,|,table,link,|,align,left,center,right,justify,|,brush,eraser,|,paragraph,fontsize,|,undo,redo",
            allowHTML: true,
            useClasses: true,
            askBeforePasteHTML:true
        }
          
    return (
        <>
            <JoditEditor
                config={joditConfig}
                value={joditBody}
                onBlur={(c) => setJoditBody(c)}
            />
        </>
    )
}

export default React.memo(Jodit)