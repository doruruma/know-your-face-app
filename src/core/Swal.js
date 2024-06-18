import Swal from 'sweetalert2/dist/sweetalert2.js'

export const Prompt = Swal.mixin({
  icon: 'question',
  showCancelButton: true,
  cancelButtonText: 'Batal'
})

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  showClass: {
    popup: `animate__animated animate__fadeInRight animate__faster`
  },
  hideClass: {
    popup: `animate__animated animate__fadeOutRight animate__faster`
  }
})

export default { Prompt, Toast }