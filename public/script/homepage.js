$(()=>{

  // nonsense
  $('#name').typeIt({
       speed: 500,
       autoStart: false
  })
  .tiType('dr.')
  .tiPause(2000)
  .tiDelete(2)
  .tiSettings({speed: 100})
  .tiType('avid ')
  .tiPause(500)
  .tiType('ruiz.')
});
