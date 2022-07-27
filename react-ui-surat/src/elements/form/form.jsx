import React from "react";

class Form extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            noPengaduan: '',
            tgl: '',
            keterangan: ''
        }

        this.onTitleChangeEvent = this.onTitleChangeEvent.bind(this)
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this)
    }

    onTitleChangeEvent(e) {
        this.setState((prevState) => {
            return {
                ...prevState,
                keterangan: e.target.value
            }
        })
    }

    onSubmitEventHandler(event) {
        event.preventDefault();
        this.props.addNotes(this.state)
    }

    render() {

        return (
            <>

                <form className="w-full">
                    <p className="font-bold uppercase text-center  py-2 px-4 rounded mb-4">Pengaduan Masyarakat</p>
                    <div class="py-2 px-6 mx-auto">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 lg:gap-1">
                            <div class="rounded-md flex items-center">
                                No.Pengaduan
                            </div>
                            <div class="rounded-md flex items-center justify-center">
                                <input class="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" placeholder="No Pengaduan" />
                            </div>
                        </div>
                    </div>
                    <div class="py-2 px-6 mx-auto">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 lg:gap-1">
                            <div class="rounded-md flex items-center">
                                Tanggal
                            </div>
                            <div class="rounded-md flex items-center justify-center">
                                <input class="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="date" placeholder="No Pengaduan" />
                            </div>
                        </div>
                    </div>
                    <div class="py-2 px-6 mx-auto">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 lg:gap-1">
                            <div class="rounded-md flex items-center">
                                Keterangan
                            </div>
                            <div class="rounded-md flex items-center justify-center">
                                <input class="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="No Pengaduan" />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="lg:mr-6 md:mr-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 float-right">Submit</button>
                </form>

            </>
        )
    }
}

export default Form