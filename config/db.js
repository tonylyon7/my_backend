import mongoose from 'mongoose'

const connectDB = async () => {
	try {
		const conn = await mongoose.connect("mongodb+srv://Tonylyon:Kingfirelord52@cluster0.4gqb5dn.mongodb.net/Tonylyon?retryWrites=true&w=majority", {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			//useCreateIndex: true,
			//MONGO_TEST for local host
		})

		console.log(`MongoDB connected: ${conn.connection.host}`)
	} catch (error) {
		console.log(`Error: ${error}`)
		process.exit(1)
	}
}

export default connectDB