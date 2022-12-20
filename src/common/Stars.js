export const Stars = (grade) => {
    const yellowStarImageUrl = new URL(
        '../assets/yellow-star.png',
        import.meta.url
    );

    const greyStarImageUrl = new URL(
        '../assets/grey-star.png',
        import.meta.url
    );

    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.width = '12.5rem';

    if (grade < 0) {
        grade = 0;
    }

    if (grade > 5) {
        grade = 5;
    }

    const finalGrade = Math.round(grade);

    for (let i = 0; i < finalGrade; i++) {
        let yellowStarImg = document.createElement('img');
        yellowStarImg.setAttribute('src', yellowStarImageUrl);
        yellowStarImg.setAttribute('alt', "Yellow star.");
        yellowStarImg.setAttribute('id', `yellow-star-${i}`);

        wrapper.append(yellowStarImg);
    }

    const leftStarsCount = 5 - finalGrade;

    for (let i = 0; i < leftStarsCount; i++) {
        let greyStarImg = document.createElement('img');
        greyStarImg.setAttribute('src', greyStarImageUrl);
        greyStarImg.setAttribute('alt', "Grey star.");
        greyStarImg.setAttribute('id', `grey-star-${i}`);

        wrapper.append(greyStarImg);
    }

    return wrapper;
}
