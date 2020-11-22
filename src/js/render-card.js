export default function renderPhotoCard(ref, templates, data) {
    ref.insertAdjacentHTML('beforeend', templates(data))
  }