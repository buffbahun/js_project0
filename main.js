function selectionSort(arry) {
  let ary = [...arry];
  let tmpAry = [];
  for (let i = 0; i < ary.length - 1; i++) {
    let tmp = ary[i];
    let pos = i;
    for (let j = i + 1; j < ary.length; j++) {
      if (ary[j] < tmp) {
        tmp = ary[j];
        pos = j;
      }
    }
    tmpAry.push([i, pos, [...ary]]);
    ary[pos] = ary[i];
    ary[i] = tmp;
  }
  return tmpAry;
}

function looper(ary) {
  let i = 0;
  ary.forEach((elm) => {
    setTimeout(() => {
      shiftSort(elm[0], elm[1], elm[2]);
    }, i * 2500);
    i++;
  });
  setTimeout(() => {
    let clearElem = document.createElement("div");
    clearElem.classList.add("new");
    clearElem.textContent = "Sort Again!!";
    main.appendChild(clearElem);

    clearElem.addEventListener("click", () => {
      document.querySelectorAll(".sorted").forEach((elm) => {
        elm.remove();
      });
      [...numBox.children].forEach((elm) => {
        elm.remove();
      });
      clearElem.remove();
    });
  }, i * 2500);
}

// virtual DOM

const main = document.querySelector(".algo");
const addElem = document.querySelector(".add");
const calc = document.querySelector(".calculate");
const numBox = document.querySelector(".num-box");

addElem.addEventListener("click", () => {
  let inpt = document.createElement("input");
  inpt.type = "text";
  inpt.classList.add("num-inp");
  let liElem = document.createElement("li");
  liElem.appendChild(inpt);
  numBox.appendChild(liElem);
});

calc.addEventListener("click", () => {
  let isNum = true;
  let tmpAry = [];
  if (numBox.childElementCount < 2) {
    return alert("Need 2 or more numbers for sorting.");
  }
  let numInp = document.querySelectorAll(".num-inp");
  numInp.forEach((cnt) => {
    if (!cnt.value || isNaN(+cnt.value)) {
      isNum = false;
      return alert("fill all input-box with positive integer values.");
    }
    tmpAry.push(+cnt.value);
  });
  if (isNum) {
    looper(selectionSort(tmpAry));
  }
});

function createElem(str) {
  let ul = document.createElement("ul");
  ul.classList.add("sorted");
  str.forEach((elm) => {
    let li = document.createElement("li");
    li.textContent = elm;
    ul.appendChild(li);
  });
  return ul;
}

function shiftSort(i, j, str) {
  let aryRef = createElem(str);
  main.appendChild(aryRef);

  let ary = [...aryRef.children];
  let firstCord = ary[i].getBoundingClientRect().left;
  let secondCord = ary[j].getBoundingClientRect().left;
  ary[i].style.transition = "all 1s ease-in-out";
  ary[j].style.transition = "all 1s ease-in-out";
  ary[j].style.top = "-60px";
  ary[i].style.top = "60px";
  setTimeout(() => {
    ary[j].style.left = `${firstCord - secondCord}px`;
    ary[i].style.left = `${secondCord - firstCord}px`;
  }, 1000);
  setTimeout(() => {
    ary[j].style.transform = "translateY(60px)";
    ary[i].style.transform = "translateY(-60px)";
  }, 1500);
}
