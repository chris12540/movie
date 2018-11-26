import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import request from 'superagent'
import Axios from 'axios';

const CLOUDINARY_UPLOAD_PRESET = 'he78ntth';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/djrk8ejp8/image/upload';


class Cloudinary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uploadedFile: null,
			uploadedFileCloudinaryURL: ''
		}
	}

	onImageDrop = files => {
		this.setState({
			uploadedFile: files[0]
		})
		this.handleImageUpload(files[0]);

	}

	handleImageUpload = file => {
		let upload = request.post(CLOUDINARY_UPLOAD_URL).field('upload_preset', CLOUDINARY_UPLOAD_PRESET).field('file', file);
		upload.end((error, response) => {
			if (error) {
				console.log(error);
			}
			if (response.body.secure_url !== '') {
				Axios.get('/auth/me').then(res => {
					Axios.patch(`/user/${res.data.id}`, { photo: response.body.secure_url }).then(res => {
						this.setState({
							uploadedFileCloudinaryURL: response.body.secure_url
						})
					})
				})
			}
		})
	}

	render() {
		return (
			<form>
				<div className="upload">
					<Dropzone multiple={false} accept='image/*' onDrop={this.onImageDrop.bind(this)} uploadedFileCloudinaryURL={this.state.uploadedFileCloudinaryURL}>
						{this.state.uploadedFile ? <p>Updated to: {this.state.uploadedFile.name}</p> : <p>Click to upload</p>}
					</Dropzone>
				</div>
			</form>
		);
	}
}

export default Cloudinary;