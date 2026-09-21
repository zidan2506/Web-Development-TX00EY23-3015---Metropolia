const bcrypt= require('bcrypt')

const password = 'mon'; // Replace with your password

// Function to hash a password
async function hashPassword(password) {

  try {
    // Generate a salt with 10 rounds (you can adjust this number)
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Password:', password);
    console.log('Salt:', salt);
    console.log('Hashed Password:', hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to compare a password with a hash
async function comparePassword(inputPassword, hashedPassword) {


  try {
    // Compare the input password with the stored hashed password
    const isMatch = await bcrypt.compare(inputPassword, hashedPassword);

    if (isMatch) {
      console.log('Password is correct.');
    } else {
      console.log('Password is incorrect.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
const inpw = "mon"
// Call the function to compare the password
// Call the function to hash the password
// const hashedPassword = hashPassword(password);
// console.log(hashedPassword);
// comparePassword(inpw, hashedPassword);
async function main() {
    const hashedPassword = await hashPassword(password)

    await comparePassword(inpw, hashedPassword);

}

main()