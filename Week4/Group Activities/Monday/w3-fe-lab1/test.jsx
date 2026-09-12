import { useState } from "react";

const [value, update] = useState('default')

console.log(value)

update('change')

console.log(value)