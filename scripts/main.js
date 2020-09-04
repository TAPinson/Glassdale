import {OfficerList} from './officers/OffierList.js'
import {CriminalList} from './criminals/CriminalList.js'
import {ConvictionSelect} from './convictions/ConvictionSelect.js'
import {NoteForm} from './notes/NoteForm.js'
import {getNotes} from './notes/NoteProvider.js'
import {NoteList} from './notes/NoteList.js'

OfficerList()
CriminalList()
ConvictionSelect()
NoteForm()
getNotes()
NoteList()