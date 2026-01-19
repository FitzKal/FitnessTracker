export default function ProteinImportance(){
    return (
        <fieldset className="border-2 border-black p-6 rounded-md">
                              <legend className="bg-gray-300 dark:bg-gray-800 px-3 rounded-full text-sm font-semibold">
                                Why is protein intake important?
                              </legend>
            <p>
                Proteins are one of three primary macronutrients that provide energy to the human body, along with fats and carbohydrates.
                Proteins are also responsible for a large portion of the work that is done in cells; they are necessary for proper structure and function of tissues and organs, and also act to regulate them.
                They are comprised of a number of amino acids that are essential to proper body function, and serve as the building blocks of body tissue.
            </p>
            <br/>
            <p>
                Proteins can be categorized based on the function they provide to the body. Below is a list of some types of proteins:
            </p>
            <ul className={"list-disc"}>
                <div className={"mx-10"}>
                    <li>
                        Antibody—proteins that protect the body from foreign particles, such as viruses and bacteria, by binding to them
                    </li>
                    <li>
                        Enzyme—proteins that help form new molecules as well as perform the many chemical reactions that occur throughout the body
                    </li>
                    <li>
                        Messenger—proteins that transmit signals throughout the body to maintain body processes
                    </li>
                    <li>
                        Structural component—proteins that act as building blocks for cells that ultimately allow the body to move
                    </li>
                    <li>
                        Transport/storage—proteins that move molecules throughout the body
                    </li>
                </div>
            </ul>
            <br/>
            <p>As can be seen, proteins have many important roles throughout the body, and as such, it is important to provide sufficient nutrition to the body to maintain healthy protein levels.</p>
        </fieldset>
    );
}