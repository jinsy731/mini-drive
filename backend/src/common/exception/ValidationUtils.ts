import { RequirementViolatedException } from './RequirementViolatedException';
function check(condition: boolean, message: string) {
    if(!condition) throw new RequirementViolatedException(message)
}

export { check };