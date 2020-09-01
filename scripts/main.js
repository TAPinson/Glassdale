import {OfficerList} from './officers/OffierList.js'
import {CriminalList} from './criminals/CriminalList.js'


OfficerList()
CriminalList()


// TEST FACILITY
import { getConvictions } from './convictions/ConvictionProvider.js'
import {ConvictionSelect} from './convictions/ConvictionSelect.js'


getConvictions()
.then(ConvictionSelect)
//ConvictionSelect()