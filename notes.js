const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {
    return 'Your notes...'
}
//Adding a note
const addNote =  (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) =>  note.title === title
)

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('New note added!'))
    } else {
        console.log(chalk.red('Note title taken!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

//Remove a note
const removeNote = (title) => {
    const notes = loadNotes()
    var flag = 0
    for(var i=0;i<notes.length;i++){
        if(notes[i].title === title){
                flag = 1
                break;
        }
    }
    if(flag === 0) {
        console.log(chalk.red("Such note not existed!"))
        return
    }
    else {
        // delete notes[i].title
        // delete notes[i].body
        temp = notes[i].title
        delete notes[i]
        updatedNote = []
        for(var i=0;i<notes.length;i++){
            if (notes[i] != null) {
                updatedNote.push({
                    title: notes[i].title,
                    body: notes[i].body
                })
            }
        }
        console.log(chalk.green(temp+"-> is deleted!"))
        saveNotes(updatedNote)
    }
}

// Read a Note

const readNote = (title) => {
    const notes = loadNotes()
    flag = 0

    for(var i=0;i<notes.length;i++){
        if(notes[i].title === title){
            console.log(chalk.yellow(notes[i].title+"-->"))
            console.log(chalk.blue(notes[i].body))
            flag=1
            break
        }
       
    }

    if(flag===0){
        console.log(chalk.red("Such Note doesn't exixt!"))
    } 
}

// showing the list

const getList = () => {
    const notes = loadNotes()
    console.log()
    for(var i=0;i<notes.length;i++){
        var no = i+1
        console.log("["+no+"]"+chalk.yellow(notes[i].title+"-->"))
        console .log(chalk.blue(notes[i].body))
        console.log("------------------------------------")
    }
}




module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote,
    getList: getList
}