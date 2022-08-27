function constructionCrew(worker) {
    if(worker.dizziness) {
        worker.levelOfHydrated += (worker.weight / 10) * worker.experience;
        worker.dizziness = false;
    }
    return worker
}
console.log(constructionCrew({ weight: 120,
    experience: 20,
    levelOfHydrated: 200,
    dizziness: true }
  
  ));