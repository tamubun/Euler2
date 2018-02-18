var ts;
var phi=0;
var theta=0;
var psi=0;
var yuka,yuka2;
var yellow=new THREE.MeshLambertMaterial({color: 0x888800});
var cyan=new THREE.MeshLambertMaterial({color: 0x00EEEE});
var magenta=new THREE.MeshLambertMaterial({color: 0x550055});
var magenta2=new THREE.MeshLambertMaterial({color: 0x442244});
var cyan2=new THREE.MeshLambertMaterial({color: 0x77BBBB});
var yellow2=new THREE.MeshLambertMaterial({color: 0xBBBB77});
var yellow3=new THREE.MeshLambertMaterial({color: 0x888800,transparent:true,opacity:0.4});
var cyan3=new THREE.MeshLambertMaterial({color: 0x00EEEE,transparent:true,opacity:0.4});
var magenta3=new THREE.MeshLambertMaterial({color: 0x550055,transparent:true,opacity:0.4});
var graphWrite;

$(function() {
	$('#original').change(function() {changePhiThetaPsi();});

	ts=new ThreejsScreen("tcanvas",0.7,0.8);
	var yukam=new THREE.MeshLambertMaterial({color: 0xFF0000,transparent:true,opacity:0.1,shading: THREE.SmoothShading});
	yukag=new THREE.CubeGeometry(2,2,0.01);
	yuka = new THREE.Mesh(yukag,yukam);
	var yukam2=new THREE.MeshLambertMaterial({color: 0x0000FF,transparent:true,opacity:0.1,shading: THREE.SmoothShading});
	yuka2 = new THREE.Mesh(yukag,yukam2);
	yuka2.position.set(0,0,-0.01);


	c=makeCoordinate(yellow,cyan,magenta);
	c1=makeCoordinate(yellow,cyan,magenta);
	ce=makeCoordinate(yellow2,cyan2,magenta2,0.6);
	ce0=makeCoordinate(yellow2,cyan2,magenta2,0.6);
	ts.camera.position.set(2.2,1.4,1.2);

	ts.scene.add(c.xjiku);
	ts.scene.add(c.yjiku);
	ts.scene.add(c.zjiku);
	ts.scene.add(c1.xjiku);
	ts.scene.add(c1.yjiku);
	ts.scene.add(c1.zjiku);
	ts.scene.add(ce.xjiku);
	ts.scene.add(ce.yjiku);
	ts.scene.add(ce.zjiku);
	ts.scene.add(yuka);
	ts.scene.add(yuka2);
        graphWrite = $('#original').is(':checked') === true
		? graphWrite1 : graphWrite2;
	graphWrite();
});
var c,c1,ce,ce0;


var Yajirushi=function(len,w,ya,yaw) {
	if( len == undefined ) {
		len=1;
	}
	if( w==undefined ) {
		w=0.03;
	}
	if( yaw==undefined ) {
		yaw=1.6;
	}
	if( ya==undefined ) {
		ya=0.2;
	}
	THREE.CylinderGeometry.call(this,w*len,w*len,len*(1-ya),(ts.useWebGL() ? 8 : 3));
	var i;
	for(i=0; i<this.vertices.length; i++ ) {
		this.vertices[i].y += 0.5*len*(1-ya);
	}
	this.capg=new THREE.Mesh(new THREE.CylinderGeometry(0,yaw*w*len,len*ya,(ts.useWebGL() ? 8 : 3)));
	for(i=0; i<this.capg.geometry.vertices.length; i++ ) {
		this.capg.geometry.vertices[i].y += len*(1-0.5*ya);
	}
	THREE.GeometryUtils.merge(this,this.capg);
}
Yajirushi.prototype=Object.create(THREE.CylinderGeometry.prototype);
Yajirushi.prototype.constructor=Yajirushi;


function makeCoordinate(xm,ym,zm,b) {
	if( b== undefined ) { b=1;}
	var cood=new Object();

	cood.xjiku=new THREE.Mesh(new Yajirushi(1,b*0.03),xm);
	cood.yjiku=new THREE.Mesh(new Yajirushi(1,b*0.03),ym);
	cood.zjiku=new THREE.Mesh(new Yajirushi(1,b*0.03),zm);
	cood.xjiku.rotation.set(0,0,-0.5*Math.PI);
	cood.zjiku.rotation.set(0.5*Math.PI,0,0);
	return cood;
}

var psi1=0;
var theta1=0;
var phi1=0;
var count=0;
var countt=0;
var countp=0;

function changePhiThetaPsi() {
	count = countt = countp = 25;
	psi1 = psi, theta1 = theta, phi1 = phi;
	$('#phival').text(phi);
	$('#thetaval').text(theta);
	$('#psival').text(psi);
	ts.scene.remove(ce.xjiku);
	ts.scene.remove(ce.yjiku);
	ts.scene.remove(ce.zjiku);

	var m=Euler(psi*Math.PI/180,theta*Math.PI/180,phi*Math.PI/180);
	ce.xjiku=c.xjiku.clone();
	ce.yjiku=c.yjiku.clone();
	ce.zjiku=c.zjiku.clone();
//	ce.xjiku.material=c.xjiku.material.clone();
//	ce.yjiku.material=c.yjiku.material.clone();
//	ce.zjiku.material=c.zjiku.material.clone();
//	ce.xjiku.material.opacity=0.4;
//	ce.xjiku.material.transparent=true;
//	ce.yjiku.material.opacity=0.4;
//	ce.yjiku.material.transparent=true;
//	ce.zjiku.material.opacity=0.4;
//	ce.zjiku.material.transparent=true;
	ce.zjiku.rotation.set(0.5*Math.PI,0,0);
	ce.xjiku.applyMatrix(m);
	ce.yjiku.applyMatrix(m);
	ce.zjiku.applyMatrix(m);
	ce.xjiku.material=yellow2;
	ce.yjiku.material=cyan2;
	ce.zjiku.material=magenta2;

	ts.scene.add(ce.xjiku);
	ts.scene.add(ce.yjiku);
	ts.scene.add(ce.zjiku);

        graphWrite = $('#original').is(':checked') === true
		? graphWrite1 : graphWrite2;
}

function graphWrite1() {
	var cospsi1,sinpsi1;
	var costheta1,sintheta1;
	if( phi1 >= phi ) {
		phi1=phi;
		if( countp<20 ) {
			countp++;
		} else {
			if( theta1 >= theta ) {
				theta1=theta;
				if( countt< 20 ) {
					countt++;
				} else {
					if( psi1 >= psi ) {
						if( count >30 ) {
							psi1=0;
							phi1=0;
							theta1=0;
							count=0;
							countt=0;
							countp=0;
						} else {
							count++;
						}
					} else {
						psi1 +=1;
					}
				}
			} else {
				theta1 +=1;
			}
		}
	} else {
		phi1 += 1;
	}
	ts.scene.remove(yuka2);
	var mt=yuka2.material.clone();
	yuka2=yuka.clone();
	yuka2.material=mt;

	document.getElementById("now").innerHTML="(φ,θ,ψ)=("+phi1+","+theta1+","+psi1+")";
	var m=Euler2(psi1*Math.PI/180,theta1*Math.PI/180,phi1*Math.PI/180);

	ts.scene.remove(c1.xjiku);
	ts.scene.remove(c1.yjiku);
	ts.scene.remove(c1.zjiku);
	c1.xjiku=c.xjiku.clone();
	c1.yjiku=c.yjiku.clone();
	c1.zjiku=c.zjiku.clone();
	c1.xjiku.material=yellow3;
	c1.yjiku.material=cyan3;
	c1.zjiku.material=magenta3;


	c1.xjiku.applyMatrix(m);
	c1.yjiku.applyMatrix(m);
	c1.zjiku.applyMatrix(m);
	yuka2.applyMatrix(m);
	yuka2.position.set(0,0,-0.01);
	ts.scene.add(yuka2);
	ts.scene.add(c1.xjiku);
	ts.scene.add(c1.yjiku);
	ts.scene.add(c1.zjiku);
//		c1.xjiku.rotation.set(0,0,psi1+0.5*Math.PI);
//		c1.yjiku.position.set(-12.5*sinpsi1,12.5*cospsi1,0);
//		c1.yjiku.rotation.set(0,0,psi1+Math.PI);
//		c1.xjiku.position.set(12.5*cospsi1,12.5*sinpsi1,0);
	requestAnimationFrame(graphWrite);
	ts.controlsUpdate();
	ts.draw();
}

function Euler(psi1,theta1,phi1) {
	cospsi1=Math.cos(psi1);
	sinpsi1=Math.sin(psi1);
	cosphi1=Math.cos(phi1);
	sinphi1=Math.sin(phi1);
	costheta1=Math.cos(theta1);
	sintheta1=Math.sin(theta1);

	return new THREE.Matrix4(cospsi1*cosphi1-sinpsi1*costheta1*sinphi1,
						-sinpsi1*cosphi1-cospsi1*costheta1*sinphi1,
						sintheta1*sinphi1,0,
						
						cospsi1*sinphi1+sinpsi1*costheta1*cosphi1,
						-sinpsi1*sinphi1+cospsi1*costheta1*cosphi1,
						-sintheta1*cosphi1,0,
						
						sinpsi1*sintheta1,cospsi1*sintheta1,costheta1,0,
						0,0,0,0);
}

function graphWrite2() {
	var cospsi1,sinpsi1;
	var costheta1,sintheta1;
	if( psi1 >= psi ) {
		psi1=psi;
		if( countp<20 ) {
			countp++;
		} else {
			if( theta1 >= theta ) {
				theta1=theta;
				if( countt< 20 ) {
					countt++;
				} else {
					if( phi1 >= phi ) {
						if( count >30 ) {
							psi1=0;
							phi1=0;
							theta1=0;
							count=0;
							countt=0;
							countp=0;
						} else {
							count++;
						}
					} else {
						phi1 +=1;
					}
				}
			} else {
				theta1 +=1;
			}
		}
	} else {
		psi1 += 1;
	}
	ts.scene.remove(yuka2);
	var mt=yuka2.material.clone();
	yuka2=yuka.clone();
	yuka2.material=mt;

	document.getElementById("now").innerHTML="(φ,θ,ψ)=("+phi1+","+theta1+","+psi1+")";
	var m=Euler2(psi1*Math.PI/180,theta1*Math.PI/180,phi1*Math.PI/180);

	ts.scene.remove(c1.xjiku);
	ts.scene.remove(c1.yjiku);
	ts.scene.remove(c1.zjiku);
	c1.xjiku=c.xjiku.clone();
	c1.yjiku=c.yjiku.clone();
	c1.zjiku=c.zjiku.clone();
	c1.xjiku.material=yellow3;
	c1.yjiku.material=cyan3;
	c1.zjiku.material=magenta3;


	c1.xjiku.applyMatrix(m);
	c1.yjiku.applyMatrix(m);
	c1.zjiku.applyMatrix(m);
	yuka2.applyMatrix(m);
	yuka2.position.set(0,0,-0.01);
	ts.scene.add(yuka2);
	ts.scene.add(c1.xjiku);
	ts.scene.add(c1.yjiku);
	ts.scene.add(c1.zjiku);
//		c1.xjiku.rotation.set(0,0,psi1+0.5*Math.PI);
//		c1.yjiku.position.set(-12.5*sinpsi1,12.5*cospsi1,0);
//		c1.yjiku.rotation.set(0,0,psi1+Math.PI);
//		c1.xjiku.position.set(12.5*cospsi1,12.5*sinpsi1,0);
	requestAnimationFrame(graphWrite);
	ts.controlsUpdate();
	ts.draw();
}

function Euler2(psi1,theta1,phi1) {
  var cospsi1, cosphi1, costheta1, sinpsi1, sinphi1, sintheta1;
  var A,B,C;
  cospsi1=Math.cos(psi1);
  sinpsi1=Math.sin(psi1);
  cosphi1=Math.cos(phi1);
  sinphi1=Math.sin(phi1);
  costheta1=Math.cos(theta1);
  sintheta1=Math.sin(theta1);
  A = new THREE.Matrix4(
    cospsi1, -sinpsi1,0,0,
    sinpsi1,cospsi1,0,0,
    0,       0,      1,0,0,0,0,0);
  B = new THREE.Matrix4(
    1,       0,      0,0,
    0,costheta1,-sintheta1,0,
    0,sintheta1,costheta1,0,0,0,0,0);

  C = new THREE.Matrix4(
    cosphi1, -sinphi1,0,0,
    sinphi1,cosphi1,0,0,
    0,       0,      1,0,0,0,0,0);
  C.multiply(B).multiply(A);
  return C;
}
