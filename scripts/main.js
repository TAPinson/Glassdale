import {OfficerList} from './officers/OffierList.js'
import {CriminalList} from './criminals/CriminalList.js'
import {ConvictionSelect} from './convictions/ConvictionSelect.js'
import {NoteForm} from './notes/NoteForm.js'
import {getNotes} from './notes/NoteProvider.js'
import './notes/NoteList.js'
import { getWitnesses } from './witnesses/WitnessProvider.js'
import { WitnessList } from './witnesses/WitnessList.js'


OfficerList()
CriminalList()
ConvictionSelect()
NoteForm()
getNotes()
getWitnesses()
WitnessList()